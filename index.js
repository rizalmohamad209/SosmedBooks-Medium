// const app = require('express')();
const express = require("express");
const prisma = require("@prisma/client");
const app = express();
const mainRoutes = require("./src/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mainRoutes);

app.listen(3006, () => {
  console.log("Server Is running on port 3006");
});
