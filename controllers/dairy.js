const { ctrlWrapper } = require("../helpers");

// Контролер додавання продукту
const addProduct = async (req, res) => {
  const { _id } = req.user;
  // const { productId, date, amount, calories } = req.body;

  res.json({
    _id,
    ...req.body,

    //   productId,
    //   date,
    //   amount,
    //   calories,
    //   bmr,
  });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
};

// const addProduct = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { productId, date, grams: newGrams, calories: newCalories } = req.body;

//   const exist = await ProductsDiary.find({ owner, productId, date });

//   if (!exist.length) {
//     const newProduct = await ProductsDiary.create({ ...req.body, owner });
//     res.status(201).json({ message: "Product added", result: newProduct });
//   }

//   const updatedProduct = await ProductsDiary.findOneAndUpdate(
//     { owner, productId, date },
//     {
//       $inc: { grams: +newGrams, calories: +newCalories },
//     },
//     { new: true }
//   );

//   res.status(200).json({ message: "Product updated", result: updatedProduct });
// };
