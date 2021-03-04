const booksRoutes = require("express").Router();
const booksControllers = require("../controllers/booksControllers");

booksRoutes.get("/", booksControllers.getBooks);

module.exports = booksRoutes;
