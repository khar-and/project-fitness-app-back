const express = require("express");
const ctrl = require("../../controllers/dairy");
const { authenticate, validateBody } = require("../../midlewares");
const { schemas } = require("../../models/dairy");

const router = express.Router();

router.post(
  "/addProduct",
  authenticate,
  validateBody(schemas.productSchema),
  ctrl.addProduct
);
// router.post("/delProduct", authenticate, ctrl.getFilteredExercises);

module.exports = router;
