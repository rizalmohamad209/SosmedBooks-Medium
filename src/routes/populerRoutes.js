const populerRoutes = require("express").Router();
const populerController = require("../controllers/populerControllers");

populerRoutes.get("/", populerController.getPopuler);

module.exports = populerRoutes;
