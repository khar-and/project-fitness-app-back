const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const bloodList = [1, 2, 3, 4];
const sexList = ["male", "female"];
const levelActivityList = [1, 2, 3, 4, 5];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 150,
    },
    currentWeight: {
      type: Number,
      default: 35,
    },
    desiredWeight: {
      type: Number,
      default: 35,
    },
    birthday: {
      // type: String,
      // default: "",
      type: Date,
      // default: "00.00.0000",
    },
    blood: {
      type: Number,
      enum: bloodList,
      default: 1,
    },
    bmr: {
      type: Number,
      default: 2200,
    },
    sex: {
      type: String,
      enum: sexList,
      default: "male",
    },
    levelActivity: {
      type: Number,
      enum: levelActivityList,
      default: 1,
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

// Створюємо Joi-схеми на реєстрацію, логін та параметри користувача
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `The name field is required.`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `The email field is required.`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `The password field is required.`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `The email field is required.`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `The password field is required.`,
  }),
});

const userSettingsSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `The name field is required.`,
  }),
  height: Joi.number().min(150).required().messages({
    "any.required": `The height field is required.`,
  }),
  currentWeight: Joi.number().min(35).required().messages({
    "any.required": `The current weight field is required.`,
  }),
  desiredWeight: Joi.number().min(35).required().messages({
    "any.required": `The desired weight field is required.`,
  }),
  birthday: Joi.date().required().messages({
    "any.required": `The birthday field is required.`,
  }),
  blood: Joi.number()
    .valid(...bloodList)
    .required()
    .messages({
      "any.required": `The blood field is required.`,
    }),
  sex: Joi.string()
    .valid(...sexList)
    .required()
    .messages({
      "any.required": `The sex field is required.`,
    }),
  levelActivity: Joi.number()
    .valid(...levelActivityList)
    .required()
    .messages({
      "any.required": `The level activity field is required.`,
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  userSettingsSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
