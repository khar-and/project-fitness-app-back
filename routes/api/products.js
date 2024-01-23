const express = require("express");
const ctrl = require("../../controllers/products");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.get("/blood", authenticate, ctrl.getProductsByBlood);

module.exports = router;
