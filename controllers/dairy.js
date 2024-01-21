const { ctrlWrapper, HttpError } = require("../helpers");
const { ProductsDiary } = require("../models/dairy");

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
    const newProduct = await ProductsDiary.create({
      userId,
      ...req.body,
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
  console.log(productId);
  const result = await ProductsDiary.findByIdAndDelete(productId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({ message: "Product deleted from Dairy" });
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

  res.status(201).json({ consumedCalories, consumedProducts });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
  delProduct: ctrlWrapper(delProduct),
  getArchive: ctrlWrapper(getArchive),
};
