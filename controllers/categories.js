const { ctrlWrapper } = require("../helpers");

const getAllCategories = async (req, res, next) => {
  const categories = [
    "alcoholic drinks",
    "berries",
    "cereals",
    "dairy",
    "dried fruits",
    "eggs",
    "fish",
    "flour",
    "fruits",
    "meat",
    "mushrooms",
    "nuts",
    "oils and fats",
    "poppy",
    "sausage",
    "seeds",
    "sesame",
    "soft drinks",
    "vegetables and herbs",
  ];

  res.send(categories);
};

module.exports = {
  getAllCategories: ctrlWrapper(getAllCategories),
};
