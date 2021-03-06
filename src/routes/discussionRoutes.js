const discussionRoutes = require("express").Router();
const discussionControllers = require("../controllers/discussionControllers");
const authMiddleware = require("../helper/authMiddleware");

discussionRoutes.get("/:id", discussionControllers.getDiscussionsByIdBooks);
discussionRoutes.post(
  "/",
  authMiddleware.checkLogin,
  discussionControllers.createOnediscussion
);

module.exports = discussionRoutes;
