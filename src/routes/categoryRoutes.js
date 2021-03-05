const categoryRoutes = require("express").Router();
const categoryControllers = require("../controllers/categoryControllers");

categoryRoutes.get("/", categoryControllers.getCategory);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);

module.exports = categoryRoutes;
