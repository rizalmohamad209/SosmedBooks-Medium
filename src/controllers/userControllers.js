const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllUsers: (req, res) => {
    prisma.user
      .findMany({})
      .then((data) => {
        res.send({
          msg: "Success",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          msg: "Failed",
          status: 500,
          error: error,
        });
      });
  },
  getProfile: (req, res) => {
    const deCode_id_user = req.decodeToken.id_user;
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
    const deCode_id_user = req.decodeToken.id_user;
    const { body } = req;

    console.log("====================================");
    console.log(deCode_id_user);
    console.log("====================================");

    const newBody = {
      ...body,
      NIK: Number(body.NIK),
      birth_date: new Date(body.birth_date),
      foto_user: req.file.path,
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
