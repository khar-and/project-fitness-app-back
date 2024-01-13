const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").configDotenv();

const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

// Контролер реєстрації
const register = async (req, res) => {
  const { name, email, password } = req.body;
  // Якщо в базі вже є такий емейл - перевіряємо і надсилаємо унікальне повідомлення

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  // Перед збкріганням Юзера - хешуємо пароль
  const hashPassword = await bcrypt.hash(password, 10);
  // формуємо токен
  const payload = {
    name,
    email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23d" });

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    token,
  });
  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
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

  const { subscription } = user;
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

// Контролер Current
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
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

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  addAvatar: ctrlWrapper(addAvatar),
};
