const mainRoutes = require("express").Router();
const bookRoutes = require("./booksRoutes");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const searchRoutes = require("./searchRoutes");
const ratingRoutes = require("./ratingRoutes");
const discussionRoutes = require("./discussionRoutes");
const borrowRoutes = require("./borrowRoutes");
const populerRoutes = require("./populerRoutes");

mainRoutes.use("/category", categoryRoutes);
mainRoutes.use("/books", bookRoutes);
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/search", searchRoutes);
mainRoutes.use("/rating", ratingRoutes);
mainRoutes.use("/discussion", discussionRoutes);
mainRoutes.use("/borrow", borrowRoutes);
mainRoutes.use("/populer", populerRoutes);

module.exports = mainRoutes;
