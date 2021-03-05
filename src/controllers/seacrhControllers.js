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
};
