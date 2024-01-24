const { ctrlWrapper } = require("../helpers");
const { ExercisesDairy } = require("../models/dairy");
const { Exercise } = require("../models/exercise");
const { User } = require("../models/user");

const getStatistic = async (req, res) => {
  //   Кількість відеотренувань
  const countVideos = await Exercise.find().countDocuments();
  console.log(countVideos);

  // загальної кількості спалених усіма зареєстрованими користувачами калорій
  const exercisesDone = await ExercisesDairy.find();
  const totalBurnedCalories = exercisesDone.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  // загальної кількості зареєстрованих у застосунку користувачів
  const countTotalUsers = await User.find().countDocuments();

  // загальної кількості годин, проведених зареєстрованими користувачами за тренуванням
  const total = exercisesDone.reduce((sum, item) => sum + item.time, 0);
  const totalSpentTimeExercise = Math.round(total / 60);

  // загальної кількості тренувань, виконаних зареєстрованими користувачами
  const totalExerciseDoneAllUsers =
    await ExercisesDairy.find().countDocuments();

  res.status(200).json({
    countVideos, // 1324
    totalBurnedCalories,
    countTotalUsers,
    totalSpentTimeExercise,
    totalExerciseDoneAllUsers,
  });
};

module.exports = {
  getStatistic: ctrlWrapper(getStatistic),
};
