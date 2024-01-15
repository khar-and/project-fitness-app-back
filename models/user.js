const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const bloodList = ["1", "2", "3", "4"];
const sexList = ["male", "female"];
const levelActivityList = ["1", "2", "3", "4", "5"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "SName for user is required"],
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
      // required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    height: {
      type: Number,
    },
    currentWeight: {
      type: Number,
    },
    desiredWeight: {
      type: Number,
    },
    birthday: {
      type: Date,
    },
    blood: {
      type: String,
      enum: bloodList,
    },
    bmr: {
      type: Number,
    },
    sex: {
      type: String,
      enum: sexList,
    },
    levelActivity: {
      type: String,
      enum: levelActivityList,
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

// Створюємо Joi-схеми на реєстрацію та логін

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSettingsSchema = Joi.object({
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.string().required(),

  blood: Joi.string()
    .valid(...bloodList)
    .required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  levelActivity: Joi.string()
    .valid(...levelActivityList)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  userSettingsSchema,
};

// Створюємо модель
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
