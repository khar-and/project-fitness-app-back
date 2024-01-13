const express = require("express");
const ctrl = require("../../controllers/categories");

const router = express.Router();

router.get("/", ctrl.getAllCategories);

module.exports = router;
