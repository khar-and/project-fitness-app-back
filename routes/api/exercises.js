const express = require("express");
const ctrl = require("../../controllers/exercises");

const router = express.Router();

router.get("/", ctrl.getAllExercises);

module.exports = router;
