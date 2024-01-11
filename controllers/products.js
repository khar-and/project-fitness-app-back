const { Product } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const getAllProducts = async (req, res, next) => {
  const { _id: owner } = req.user; // повернення контактів авторизованого юзера

  // Пагінація
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Product.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
};
