const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getBooks: (req, res) => {
    prisma.books
      .findMany({
        include: {
          category: {
            select: {
              name_category: true,
            },
          },
          discussion: {
            select: {
              diskusi: true,
            },
          },
          user: true,
        },
      })
      .then((data) => {
        res.send({
          message: "Sucess",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Error",
          status: 500,
          error: error,
        });
      });
  },
};
