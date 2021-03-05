const discussionRoutes = require("express").Router();
const discussionControllers = require("../controllers/discussionControllers");

discussionRoutes.get("/", discussionControllers.getDiscussions);
discussionRoutes.post("/", discussionControllers.createOnediscussion);

module.exports = discussionRoutes;
