const ratingRoutes = require("express").Router();
const ratingControllers = require("../controllers/ratingControllers");

ratingRoutes.get("/", ratingControllers.getrating);
ratingRoutes.post("/", ratingControllers.createRating);
ratingRoutes.get("/:id", ratingControllers.getRatingById);
module.exports = ratingRoutes;
