const express = require("express");
const ctrl = require("../../controllers/products");
const { authenticate, validateBody } = require("../../midlewares");
const { schemas } = require("../../models/product");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllProducts);
router.get("/blood", authenticate, validateBody(schemas.filterSchema), ctrl.getProductsByBlood)

module.exports = router;
