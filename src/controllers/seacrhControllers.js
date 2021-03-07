const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getSearchBoook: (req, res) => {
    const { keyword } = req.body;
    console.log("====================================");
    console.log(keyword);
    console.log("====================================");
    prisma.books
      .findMany({
        where: {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      })
      .then((data) => {
        res.send({
          message: `success get books ${keyword}`,
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "error while get data book",
          status: 500,
          error: error,
        });
      });
  },
  getByCategory: (req, res) => {
    const { keyword } = req.body;
    prisma.books
      .findMany({
        where: {
          id_category: parseInt(keyword),
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
          message: "Failed",
          status: 500,
          data: data,
        });
      });
  },
};
