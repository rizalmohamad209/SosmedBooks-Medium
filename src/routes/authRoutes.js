const authRoutes = require("express").Router();
const authControllers = require("../controllers/authControllers");

authRoutes.post("/sign-up", authControllers.signUp);
authRoutes.post("/sign-in", authControllers.signIn);

module.exports = authRoutes;
