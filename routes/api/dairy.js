const express = require("express");
const ctrl = require("../../controllers/dairy");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.post("/addProduct", authenticate, ctrl.addProduct);
// router.post("/delProduct", authenticate, ctrl.getFilteredExercises);

module.exports = router;
