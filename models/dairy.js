const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const addProductSchema = new Schema(
  {
    userId: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,

      required: true,
    },
    product: {
      type: Object,
    },
  },
  { versionKey: false }
);

const addExerciseSchema = new Schema(
  {
    userId: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    exerciseId: {
      type: String,

      required: true,
    },
    exercise: {
      type: Object,
    },
  },
  { versionKey: false }
);

addProductSchema.post("save", handleMongooseError);
addExerciseSchema.post("save", handleMongooseError);

const productSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const exerciseSchema = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const schemas = {
  productSchema,
  exerciseSchema,
};

const ProductsDiary = model("dairyProduct", addProductSchema);
const ExercisesDairy = model("dairyExercises", addExerciseSchema);

module.exports = {
  ProductsDiary,
  ExercisesDairy,
  schemas,
};
