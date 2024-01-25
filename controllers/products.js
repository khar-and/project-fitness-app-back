const { Product } = require("../models/product");
const { ctrlWrapper } = require("../helpers");
const { filterProducts } = require("../helpers/filtersProducts");

const getProductsByBlood = async (req, res) => {
  const { allowed, category, query, page = 1 } = req.query;
  const { blood } = req.user;
  const limit = 100;
  const skip = (page - 1) * limit;
  const filters = filterProducts(blood, allowed, category, query);
  const result = await Product.find(filters, "", { skip, limit });
  const count = await Product.find(filters).countDocuments();
  res.send({ result, count });
};

module.exports = {
  getProductsByBlood: ctrlWrapper(getProductsByBlood),
};
