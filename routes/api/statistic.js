const express = require("express");
const ctrl = require("../../controllers/statistic");

const router = express.Router();

router.get("/", ctrl.getStatistic);

module.exports = router;
