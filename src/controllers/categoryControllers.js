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
  createCategory: (req, res) => {
    const { body } = req;
    const newBody = {
      ...body,
      cover_category: req.file.path,
    };
    prisma.category
      .create({
        data: newBody,
      })
      .then((data) => {
        res.status(200).send({
          message: "Success Add Category",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error While Add Category",
          status: 500,
          error,
        });
      });
  },
  deleteCategory: (req, res) => {
    const { id } = req.params;
    prisma.category
      .delete({
        where: parseInt(id),
      })
      .then((data) => {
        res.status(200).send({
          message: "Success Delete Category",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error While Delete Books",
          status: 500,
          error,
        });
      });
  },
};
