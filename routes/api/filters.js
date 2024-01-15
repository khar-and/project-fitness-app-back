const express = require("express");
const ctrl = require("../../controllers/filters");

const router = express.Router();

// router.get("/", ctrl.getAllFilters); якщо десь задіяний залишаємо
// видає все разом (частини тілу/м'язи/обладнання)
router.get("/bodyparts", ctrl.getBodyParts);
router.get("/muscles", ctrl.getMuscles);
router.get("/equipment", ctrl.getEquipment);

module.exports = router;
