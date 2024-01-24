const { ctrlWrapper } = require("../helpers");
const { Exercise } = require("../models/exercise");

const getStatistic = async (req, res) => {
  //   Кількість відеотренувань
  const countVideos = await Exercise.find().countDocuments();
  console.log(countVideos);

  res.status(200).json({
    countVideos, // 1324
  });
};

module.exports = {
  getStatistic: ctrlWrapper(getStatistic),
};
