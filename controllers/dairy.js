const { ctrlWrapper, HttpError } = require("../helpers");
const { ProductsDiary, ExercisesDairy } = require("../models/dairy");
const { Exercise } = require("../models/exercise");
const { Product } = require("../models/product");

// Контролер додавання продукту
// 1. Робоча схема - якщо користувач в дайрі обирає два однакових продукта, але з різними значеннями грамів, то показники грамів та калорій додаються і в дайрі відображається тільки один документ/продукт
// 2. Альтернатива (треба прибрати блок else і не використовувати isAlreadyProduct) - якщо користувач обирає однакові за назвою продукти і вони в дейрі відображаються окремими позиціями.
const addProduct = async (req, res) => {
  const { _id } = req.user;
  const userId = _id;
  const { productId, date, amount, calories } = req.body;
  const gram = amount;
  const cal = calories;

  // Перевіряємо чи є в базі вже такий продукт з врахуванням дати та юзера. Створюємо, чи коригуємо існуючий, в частині грамів та калорій.
  const isAlreadyProduct = await ProductsDiary.find({
    userId,
    productId,
    date,
  });
  if (!isAlreadyProduct.length) {
    const product = await Product.findById(productId); // Замість populete (getArchive)
    const newProduct = await ProductsDiary.create({
      userId,
      ...req.body,
      product,
    });
    res.status(201).json({ info: newProduct });
  } else {
    const correctedProduct = await ProductsDiary.findOneAndUpdate(
      { userId, productId, date },
      {
        $inc: { amount: +gram, calories: +cal },
      },
      { new: true }
    );
    res.status(201).json({ info: correctedProduct });
  }
};

// Контролер видалення продукту
const delProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await ProductsDiary.findByIdAndDelete(productId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({ message: "Product deleted from Dairy" });
};

// Контролер додавання вправи
const addExercise = async (req, res) => {
  const { _id } = req.user;
  const userId = _id;
  const { exerciseId, date, time, calories } = req.body;
  const worktime = time;
  const cal = calories;

  // Перевіряємо чи є в базі вже така вправа з врахуванням дати та юзера. Створюємо, чи коригуємо існуючу, в частині часу та калорій.
  const isAlreadyExercise = await ExercisesDairy.find({
    userId,
    exerciseId,
    date,
  });
  if (!isAlreadyExercise.length) {
    const exercise = await Exercise.findById(exerciseId); // Замість populete (getArchive)
    const newExercise = await ExercisesDairy.create({
      userId,
      ...req.body,
      exercise,
    });
    res.status(201).json({ info: newExercise });
  } else {
    const correctedExercise = await ExercisesDairy.findOneAndUpdate(
      { userId, exerciseId, date },
      {
        $inc: { time: +worktime, calories: +cal },
      },
      { new: true }
    );
    res.status(201).json({ info: correctedExercise });
  }
};

// Контролер видалення вправи (по ID продукту в базі dairyExercise)
const delExercise = async (req, res) => {
  const { exerciseId } = req.params;
  console.log(exerciseId);
  const result = await ExercisesDairy.findByIdAndDelete(exerciseId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({ message: "Exercise deleted from Dairy" });
};

// Контролер отримання інформації по даті (продукти та вправи)
const getArchive = async (req, res) => {
  const { date } = req.query; // отримуємо дату з запиту
  const { _id } = req.user;
  const userId = _id; // Отримаємо user Id

  // Перевіряємо чи введені параметри запиту
  if (Object.keys(req.query).length < 1) {
    throw HttpError(404, "Not Found, enter the date!");
  }

  // Витрачені калорії
  const consumedProducts = await ProductsDiary.find({ userId, date });
  const consumedCalories = consumedProducts.reduce(
    (sum, item) => sum + item.calories,
    0
  );
  // Показники розділу Exercises
  const exercisesDone = await ExercisesDairy.find({ userId, date });
  const consumedBurned = exercisesDone.reduce(
    (sum, item) => sum + item.calories,
    0
  );
  const spentTime = exercisesDone.reduce((sum, item) => sum + item.time, 0);

  res.status(201).json({
    consumedCalories,
    consumedBurned,
    spentTime,
    consumedProducts,
    exercisesDone,
  });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
  delProduct: ctrlWrapper(delProduct),
  addExercise: ctrlWrapper(addExercise),
  delExercise: ctrlWrapper(delExercise),
  getArchive: ctrlWrapper(getArchive),
};
