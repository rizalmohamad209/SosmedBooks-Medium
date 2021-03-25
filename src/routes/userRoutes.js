const userRoutes = require("express").Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../helper/authMiddleware");

userRoutes.get(
  "/profile",
  authMiddleware.checkLogin,
  userControllers.getProfile
);
userRoutes.put("/", authMiddleware.checkLogin, userControllers.editUser);
userRoutes.get("/", userControllers.getAllUsers);

module.exports = userRoutes;
