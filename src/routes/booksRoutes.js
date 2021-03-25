const booksRoutes = require("express").Router();
const booksControllers = require("../controllers/booksControllers");
const authMiddleware = require("../helper/authMiddleware");
const uploadMiddleware = require("../helper/upload Middleware");

booksRoutes.post(
  "/",
  authMiddleware.checkLogin,
  uploadMiddleware,
  booksControllers.createBook
);
booksRoutes.get("/", booksControllers.getBooksAll);
booksRoutes.get(
  "/byuser",
  authMiddleware.checkLogin,
  booksControllers.getBooks
);
booksRoutes.delete(
  "/:id",
  authMiddleware.checkLogin,
  booksControllers.deleteBooks
);
booksRoutes.put(
  "/:id",
  authMiddleware.checkLogin,
  uploadMiddleware,
  booksControllers.editBook
);
booksRoutes.get(
  "/:id",
  authMiddleware.checkLogin,
  booksControllers.getBookById
);

module.exports = booksRoutes;
