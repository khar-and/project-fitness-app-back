const express = require("express");
const ctrl = require("../../controllers/products");
const { authenticate } = require("../../midlewares");
// const { schemas } = require("../../models/product");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllProducts);
router.get("/blood", authenticate, ctrl.getProductsByBlood);

module.exports = router;
