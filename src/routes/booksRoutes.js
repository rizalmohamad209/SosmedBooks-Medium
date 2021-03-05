const booksRoutes = require("express").Router();
const booksControllers = require("../controllers/booksControllers");
const authMiddleware = require("../helper/authMiddleware");

booksRoutes.get("/", authMiddleware.checkLogin, booksControllers.getBooks);
booksRoutes.get("/:id", booksControllers.getBookById);
booksRoutes.post("/", authMiddleware.checkLogin, booksControllers.createBook);
booksRoutes.delete(
  "/:id",
  authMiddleware.checkLogin,
  booksControllers.deleteBooks
);
booksRoutes.put("/:id", authMiddleware.checkLogin, booksControllers.editBook);

module.exports = booksRoutes;
