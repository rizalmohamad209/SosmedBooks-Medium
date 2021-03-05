const searchRoutes = require("express").Router();
const searchControllers = require("../controllers/seacrhControllers");

searchRoutes.get("/", searchControllers.getSearchBoook);
searchRoutes.get("/category", searchControllers.getByCategory);

module.exports = searchRoutes;
