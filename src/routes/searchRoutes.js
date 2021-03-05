const authSearch = require("express").Router();
const searchControllers = require("../controllers/seacrhControllers");

authSearch.get("/", searchControllers.getSearchBoook);

module.exports = authSearch;
