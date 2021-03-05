const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getCategory: (req, res) => {
    prisma.category
      .findMany({})
      .then((data) => {
        res.send({
          message: "Success",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed While Get data Category",
          status: 500,
          error: error,
        });
      });
  },
  getCategoryById: (req, res) => {
    const { id } = req.params;
    prisma.category
      .findUnique({
        where: {
          id_category: parseInt(id),
        },
      })
      .then((data) => {
        res.send({
          message: "Success",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed While Get Data By Id",
          status: 500,
          error: error,
        });
      });
  },
};
