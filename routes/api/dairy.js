const express = require("express");
const ctrl = require("../../controllers/dairy");
const { authenticate, validateBody } = require("../../midlewares");
const { schemas } = require("../../models/dairy");

const router = express.Router();

router.get("/archive", authenticate, ctrl.getArchive);
router.post(
  "/addProduct",
  authenticate,
  validateBody(schemas.productSchema),
  ctrl.addProduct
);
router.post(
  "/addExercise",
  authenticate,
  validateBody(schemas.exerciseSchema),
  ctrl.addExercise
);
router.delete("/delProduct/:productId", authenticate, ctrl.delProduct);
router.delete("/delExercise/:exerciseId", authenticate, ctrl.delExercise);

module.exports = router;
