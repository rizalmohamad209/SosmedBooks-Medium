const categoryRoutes = require("express").Router();
const categoryControllers = require("../controllers/categoryControllers");

categoryRoutes.get("/", categoryControllers.getCategory);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);
categoryRoutes.post("/", categoryControllers.createCategory);
categoryRoutes.delete("/:id", categoryControllers.deleteCategory);

module.exports = categoryRoutes;
