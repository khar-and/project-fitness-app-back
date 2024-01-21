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
router.delete("/delProduct/:productId", authenticate, ctrl.delProduct);

module.exports = router;
