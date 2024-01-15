const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");
const { User } = require("./user");

// const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const bloodList = ["1", "2", "3", "4"];
const sexList = ["male", "female"];
const levelActivityList = ["1", "2", "3", "4", "5"];


const customerSettingsSchema = new Schema(
  {
    height: {
      type: Number,
      required: true,
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    desiredWeight: {
      type: Number,
      required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    blood: {
      type: String,
      enum: bloodList,
      required: true,
    },
    bmr: {
      type: Number
    },
    sex: {
        type: String,
        enum: sexList,
        required: true,
    },
    levelActivity: {
        type: String,
        enum: levelActivityList,
        required: true,
    },
    user: {
      type: Schema.Types.Object,
      ref: User
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "customer_settings",
    },
    token: String,
  },
  { versionKey: false }
);

customerSettingsSchema.post("save", handleMongooseError);

// Створюємо Joi-схеми на реєстрацію та логін

const addSchema = Joi.object({
  height:Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  // birthday: Joi.number().integer().min(1900).max(2005).required(),
  birthday: Joi.string().required(),
  blood: Joi.string().valid(...bloodList).required(),
  sex: Joi.string().valid(...sexList).required(),
  levelActivity: Joi.string().valid(...levelActivityList).required(),
});


// Створюємо модель
const Customer = model("customer_settings", customerSettingsSchema);

module.exports = {
  Customer,
  addSchema,
};
