const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").configDotenv();

const { ctrlWrapper, HttpError, calcBMR } = require("../helpers");

const { SECRET_KEY } = process.env;

// Контролер реєстрації
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23d" });
  await User.findByIdAndUpdate(newUser._id, { token });
  const visibleUser = await User.find(newUser._id, "-password");

  res.status(201).json({
    token,
    user: visibleUser,
  });
};

// Контролер логіна
const login = async (req, res) => {
  const { email, password } = req.body;
  // Перевірка чи існує вже такий користувач
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // Якщо такий користувач вже існує, то перевіряємо паролі
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  // Якщо паролі співпадають - с творюємо токен і відправляємо на фронтенд
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23d" });
  await User.findByIdAndUpdate(user._id, { token });
  const visibleUser = await User.find(user._id, "-token -password");
  res.json({
    token,
    user: visibleUser,
  });
};

// Контролер Current
const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (!user) {
    HttpError(404, "User not found");
  }
  console.log(user);
  res.status(200).json({
    user,
  });
};

// Контролер Logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout",
  });
};

// Контролер addAvatar
const addAvatar = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "File for upload is missing" });
  }
  const { _id } = req.user;
  const avatarURL = req.file.path;
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

// Контроллер Profile Settings
const setProfileSettings = async (req, res) => {
  const { _id } = req.user;
  const bmr = Math.floor(calcBMR(req.body));
  const dailyPhysicalActivity = 110;
  await User.findByIdAndUpdate(_id, {
    ...req.body,
    bmr,
    dailyPhysicalActivity,
  });
  const user = await User.findOne({ _id });
  res.status(200).json(user);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  addAvatar: ctrlWrapper(addAvatar),
  setProfileSettings: ctrlWrapper(setProfileSettings),
};
