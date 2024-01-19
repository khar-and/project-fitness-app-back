const express = require("express");
const ctrl = require("../../controllers/exercises");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.get("/filters", authenticate, ctrl.getFilters);
router.get("/exercises", authenticate, ctrl.getFilteredExercises);

module.exports = router;
