const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getrating: (req, res) => {
    prisma.rating
      .groupBy({
        by: ["id_books"],
        count: {
          id_books: true,
        },
        sum: {
          rating: true,
        },
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
};
