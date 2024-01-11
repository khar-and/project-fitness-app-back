const { Schema, model } = require("mongoose");

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

const Product = model("product", productSchema);

module.exports = {
  Product,
};
