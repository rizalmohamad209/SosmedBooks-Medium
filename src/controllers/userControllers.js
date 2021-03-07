const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports = {
  getProfile: (req, res) => {
    const token = req.header("x-access-token").split(" ")[1];
    const deCoded = jwt.verify(token, "RIZAL123");
    let deCodedId_User = deCoded.id_user;
    // console.log("====================================");
    // console.log(decodedID);
    // console.log("====================================");
    prisma.user
      .findMany({
        where: {
          id_user: deCodedId_User,
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
  addUser: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      NIK: parseInt(body.NIK),
      birth_date: new Date(body.birth_date),
    };
    prisma.user
      .update({
        where: {
          id_user: parseInt(id),
        },
        data: newBody,
      })
      .then((data) => {
        res.send({
          message: "Succes add User",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed add user",
          status: 500,
          error: error,
        });
      });
  },
};
