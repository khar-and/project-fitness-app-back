const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

// Створюємо схему
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

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

// Створюємо об'єкт для всіх Joi-схем і потім експортуємо в апі....
const schemas = {
  addSchema,
  updateFavoriteSchema,
};

// Якщо сталася помилка під час валідації - оброблюємо її
contactSchema.post("save", handleMongooseError);
productSchema.post("save", handleMongooseError);

// Створюємо модель
const Contact = model("contact", contactSchema);
const Product = model("product", productSchema);

module.exports = { Contact, Product, schemas };
