const { Schema, model } = require("mongoose");
// const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const addProductSchema = new Schema({
  userId: {
    type: String,
    required: [true, "SName for user is required"],
  },
});

// addProductSchema.post("save", handleMongooseError);

const productSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const schemas = {
  productSchema,
};

const AddProduct = model("dairyProduct", addProductSchema);

module.exports = {
  AddProduct,
  schemas,
};
