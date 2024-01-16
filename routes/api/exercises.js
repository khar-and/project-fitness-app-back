const express = require("express");
const ctrl = require("../../controllers/exercises");

const router = express.Router();

router.get("/filters", ctrl.getFilters);
router.get("/exercises", ctrl.getFilteredExercises);

module.exports = router;
