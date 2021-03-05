const mainRoutes = require("express").Router();
const booksRoutes = require("./booksRoutes");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const searchRoutes = require("./searchRoutes");
const ratingRoutes = require("./ratingRoutes");

mainRoutes.use("/category", categoryRoutes);

mainRoutes.use("/books", booksRoutes);

mainRoutes.use("/auth", authRoutes);

mainRoutes.use("/user", userRoutes);
mainRoutes.use("/search", searchRoutes);
mainRoutes.use("/rating", ratingRoutes);

module.exports = mainRoutes;
