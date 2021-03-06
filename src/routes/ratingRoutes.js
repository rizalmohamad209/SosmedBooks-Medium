const ratingRoutes = require("express").Router();
const ratingControllers = require("../controllers/ratingControllers");

ratingRoutes.get("/", ratingControllers.getrating);
ratingRoutes.post("/", ratingControllers.createRating);
module.exports = ratingRoutes;
