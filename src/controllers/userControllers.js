const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getProfile: (req, res) => {
    prisma.user
      .findMany({})
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
      no_hp: parseInt(body.no_hp),
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
