const { ctrlWrapper } = require("../helpers");

// Контролер додавання продукту
const addProduct = async (req, res) => {
  const { _id, bmr } = req.user;
  const { productId, date, amount, calories } = req.body;

  res.json({
    _id,
    productId,
    date,
    amount,
    calories,
    bmr,
  });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
};
