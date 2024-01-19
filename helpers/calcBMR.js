const calcBMR = ({ sex, height, currentWeight, levelActivity, birthday }) => {
  const levelActivityCof = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();
  if (sex === "male") {
    return (
      (10 * Number(currentWeight) + 6.25 * Number(height) - 5 * age + 5) *
      levelActivityCof[levelActivity]
    );
  } else {
    return (
      (10 * Number(currentWeight) + 6.25 * Number(height) - 5 * age - 161) *
      levelActivityCof[levelActivity]
    );
  }
};

module.exports = calcBMR;
