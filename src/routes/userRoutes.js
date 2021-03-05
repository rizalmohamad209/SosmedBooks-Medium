const userRoutes = require("express").Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../helper/authMiddleware");

userRoutes.get("/", authMiddleware.checkLogin, userControllers.getProfile);
userRoutes.post("/:id", authMiddleware.checkLogin, userControllers.addUser);

module.exports = userRoutes;
