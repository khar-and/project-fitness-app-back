const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
  {
    weight: {
      type: Number,
    },
    colories: {
      type: Number,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    groupBloodNotAllowed: {
      1: Boolean,
      2: Boolean,
      3: Boolean,
      4: Boolean,
    },
  },
  { versionKey: false }
);
// allowed, category, query
const Product = model("product", productSchema);

const filterSchema = Joi.object({
  allowed: Joi.boolean().required().allow("all"),
  category: Joi.string().allow(""),
  query: Joi.string().allow(""),
});

const schemas = {
  filterSchema,
};
module.exports = {
  Product,
  schemas,
};
