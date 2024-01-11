const { Exercise } = require("../models/exercise");
const { ctrlWrapper } = require("../helpers");

const getAllExercises = async (req, res, next) => {
  const result = await Exercise.find();
  res.json(result);
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
};
