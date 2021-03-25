const ratingRoutes = require("express").Router();
const ratingControllers = require("../controllers/ratingControllers");
const authMiddleware = require("../helper/authMiddleware");

ratingRoutes.get("/", ratingControllers.getrating);
ratingRoutes.post(
  "/",
  authMiddleware.checkLogin,
  ratingControllers.createRating
);
ratingRoutes.get("/:id", ratingControllers.getRatingById);
module.exports = ratingRoutes;
