const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const addProductSchema = new Schema({
  userId: {
    type: String,
    // required: true,
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
    // type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

addProductSchema.post("save", handleMongooseError);

const productSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const schemas = {
  productSchema,
};

const ProductsDiary = model("dairyProduct", addProductSchema);

module.exports = {
  ProductsDiary,
  schemas,
};
