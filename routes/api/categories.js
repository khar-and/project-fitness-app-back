const express = require("express");
const ctrl = require("../../controllers/categories");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllCategories);

module.exports = router;
