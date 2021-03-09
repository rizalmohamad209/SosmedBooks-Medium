const booksRoutes = require("express").Router();
const booksControllers = require("../controllers/booksControllers");
const authMiddleware = require("../helper/authMiddleware");
const uploadMiddleware = require("../helper/upload Middleware");

booksRoutes.get("/user", authMiddleware.checkLogin, booksControllers.getBooks);
booksRoutes.get("/:id", booksControllers.getBookById);
booksRoutes.get("/", booksControllers.getBooksAll);
booksRoutes.post(
  "/",
  authMiddleware.checkLogin,
  uploadMiddleware,
  booksControllers.createBook
);
booksRoutes.delete(
  "/:id",
  authMiddleware.checkLogin,
  booksControllers.deleteBooks
);
booksRoutes.put("/:id", authMiddleware.checkLogin, booksControllers.editBook);

module.exports = booksRoutes;
