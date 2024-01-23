const { Product } = require("../models/product");
const { ctrlWrapper } = require("../helpers");
const { filterProducts } = require("../helpers/filtersProducts");
// require("dotenv").configDotenv();

// const getAllProducts = async (req, res, next) => {
//   // const { keyword, category, variant } = req.query;
//   const result = await Product.find();
//   const count = await Product.find().countDocuments();
//   res.json({ result, count });
// };

const getProductsByBlood = async (req, res) => {
  const { allowed, category, query } = req.query;
  // const { allowed, category, query } = req.body
  const { blood } = req.user;
  const filters = filterProducts(blood, allowed, category, query);
  const result = await Product.find(filters);
  const count = await Product.find(filters).countDocuments();
  res.send({ result, count });
};

module.exports = {
  // getAllProducts: ctrlWrapper(getAllProducts),
  getProductsByBlood: ctrlWrapper(getProductsByBlood),
};
