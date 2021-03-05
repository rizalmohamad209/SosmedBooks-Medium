const ratingRoutes = require("express").Router();
const ratingControllers = require("../controllers/ratingControllers");

ratingRoutes.get("/", ratingControllers.getrating);
module.exports = ratingRoutes;
