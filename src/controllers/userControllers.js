const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: (req, res) => {
    prisma.user
      .findMany({})
      .then((data) => {
        res.status(200).send({
          message: "Succes Get Al Users",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error While Get All Users",
          status: 500,
          error,
        });
      });
  },
  getProfile: (req, res) => {
    const token = req.header("x-access-token").split(" ")[1];
    const deCodeId = jwt.verify(token, "RIZAL123");
    const deCode_id_user = deCodeId.id_user;
    console.log("====================================");
    console.log(deCode_id_user);
    console.log("====================================");
    prisma.user
      .findMany({
        where: {
          id_user: deCode_id_user,
        },
      })
      .then((data) => {
        res.send({
          message: "Succes Get Data Profile",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Error While Get Data Profile",
          status: 500,
          error: error,
        });
      });
  },
  editUser: (req, res) => {
    const token = req.header("x-access-token").split(" ")[1];
    const deCodeId = jwt.verify(token, "RIZAL123");
    const deCode_id_user = deCodeId.id_user;
    const { body } = req;

    console.log("====================================");
    console.log(deCode_id_user);
    console.log("====================================");

    const newBody = {
      ...body,
      NIK: parseInt(body.NIK),
      birth_date: new Date(body.birth_date),
    };
    prisma.user
      .update({
        where: {
          id_user: deCode_id_user,
        },
        data: newBody,
      })
      .then((data) => {
        res.status(200).send({
          message: "Succes edit User",
          status: 200,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed Edit user",
          status: 500,
          error: error,
        });
      });
  },
};
