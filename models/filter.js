const { Schema, model } = require("mongoose");

const filterSchema = new Schema(
  {
    filter: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Filter = model("filter", filterSchema);

module.exports = {
  Filter,
};
