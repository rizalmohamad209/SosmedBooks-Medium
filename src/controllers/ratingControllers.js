const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getrating: (req, res) => {
    prisma.rating
      .groupBy({
        by: ["books_id"],
        avg: {
          rating: true,
        },
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          delete data[i].count;
          delete data[i].sum;
        }

        res.send({
          message: "success",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "failed",
          status: 500,
          error: error,
        });
      });
  },
  createRating: (req, res) => {
    const decodeIdUser = req.decodeToken.id_user;
    const { body } = req;
    const newBody = {
      ...body,
      rating: parseFloat(body.rating),
      books_id: parseInt(body.books_id),
      user_id: decodeIdUser,
    };

    prisma.rating
      .create({
        data: newBody,
      })
      .then((data) => {
        res.send({
          message: "Success Input Rating",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed While Input Rating",
          status: 400,
          error: error,
        });
      });
  },
  getRatingById: (req, res) => {
    const { id } = req.params;
    prisma.rating
      .groupBy({
        by: ["id_books"],
        where: {
          id_books: parseInt(id),
        },
        avg: {
          rating: true,
        },
      })
      .then((data) => {
        res.send({
          message: "Success Get Rating By id",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Error While Get Rating By id",
          status: 500,
          error: error,
        });
      });
  },
};
