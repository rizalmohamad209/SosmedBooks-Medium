const categoryRoutes = require("express").Router();
const categoryControllers = require("../controllers/categoryControllers");
const authMiddleware = require("../helper/authMiddleware");
const uploadMiddleware = require("../helper/uploadCategoryMiddleware");

categoryRoutes.get("/", categoryControllers.getCategory);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);
categoryRoutes.post(
  "/",
  authMiddleware.checkLogin,
  uploadMiddleware,
  categoryControllers.createCategory
);
categoryRoutes.delete("/:id", categoryControllers.deleteCategory);

module.exports = categoryRoutes;
