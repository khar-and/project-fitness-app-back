const { Exercise } = require("../models/exercise");
const { Filter } = require("../models/filter");
const { ctrlWrapper, HttpError } = require("../helpers"); // HttpError

// Отримуємо категорії вправ з врахуванням query(Body parts/Muscle/Equipment)
const getFilters = async (req, res, next) => {
  const { filter } = req.query;
  const result = await Filter.find({ filter });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    result,
  });
};

// Отримуємо всі вправи з врахуванням вибраної категорії та фільтру в query
const getFilteredExercises = async (req, res, next) => {
  const { filter, category } = req.query;
  let result;
  switch (filter) {
    case "Body parts":
      result = await Exercise.find({ bodyPart: category });
      break;
    case "Muscles":
      result = await Exercise.find({ target: category });
      break;
    case "Equipment":
      result = await Exercise.find({ equipment: category });
      break;

    // default:
    //   break;
  }

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getFilters: ctrlWrapper(getFilters),
  getFilteredExercises: ctrlWrapper(getFilteredExercises),
};
