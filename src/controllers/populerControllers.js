const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getPopuler: (req, res) => {
    prisma
      .$queryRaw(
        "SELECT title,author,cover_book, AVG(rating) as rating FROM rating INNER JOIN books ON rating.books_id=books.id_books GROUP BY title,author,cover_book ORDER BY rating DESC"
      )
      .then((data) => {
        res.status(200).send({
          msg: "Succes Get Populer Books",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Failed Get Data Populer Books",
          status: 500,
          err,
        });
      });
  },
};
