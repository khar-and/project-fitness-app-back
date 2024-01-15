const { Exercise } = require("../models/exercise");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllExercises = async (req, res, next) => {
  const result = await Exercise.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
};
