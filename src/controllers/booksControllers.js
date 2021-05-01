const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getBooks: (req, res) => {
    const page = req.body.pagination;
    const booksPerPage = 5;
    const offset = (page - 1) * booksPerPage;
    const deCoded_id_user = req.decodeToken.id_user;
    prisma.books
      .findMany({
        take: booksPerPage,
        orderBy: {
          id_books: "asc",
        },
        limit: offset,
        where: {
          id_user: deCoded_id_user,
        },
        include: {
          category: {
            select: {
              name_category: true,
            },
          },
          user: {
            select: {
              name_user: true,
            },
          },
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
          message: "Error While Get Books",
          status: 500,
          error: error,
        });
      });
  },
  getBookById: (req, res) => {
    const { id } = req.params;
    prisma.books
      .findUnique({
        where: {
          id_books: parseInt(id),
        },
        include: {
          category: {
            select: {
              name_category: true,
            },
          },
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
          error: error,
        });
      });
  },
  createBook: (req, res) => {
    const deCoded_id_user = req.decodeToken.id_user;
    
    const { body } = req;
    const newBody = {
      ...body,
      // ISBN: parseInt(Text.ISBN),
      // pages: parseInt(Text.pages),
      // id_category: parseInt(Text.id_category),
      // id_user: deCoded_id_user,
      // cover__book: req.file.path,
      pages: parseInt(body.pages),
      id_category: parseInt(body.id_category),
      cover_book: req.image.url,
      id_user: deCoded_id_user,
    };
    console.log("====================================");
    console.log(newBody);
    console.log("====================================");
    prisma.books
      .create({
        data: newBody,
      })
      .then((data) => {
        res.status(200).send({
          msg: "Success",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        res.status(500).send({
          msg: "failed",
          status: 500,
          error,
        });
      });
  },
  deleteBooks: (req, res) => {
    const deCoded_id_user = req.decodeToken.id_user;
    const { id } = req.params;

    prisma.books
      .deleteMany({
        where: {
          id_user: deCoded_id_user,
          id_books: parseInt(id),
        },
      })
      .then((data) => {
        if (data.count > 0) {
          res.status(200).send({
            message: "Success delete book",
            status: 200,
          });
        } else {
          res.status(401).send({
            message: "Error Forbidden",
            status: 401,
          });
        }
      })
      .catch((error) => {
        res.send({
          message: "Error deleting book",
          status: 500,
          error: error,
        });
      });
  },
  editBook: (req, res) => {
    const deCoded_id_user = req.decodeToken.id_user;
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      ISBN: parseInt(body.ISBN),
      pages: parseInt(body.pages),
      id_category: parseInt(body.id_category),
      id_user: parseInt(body.id_user),
    };

    prisma.books
      .updateMany({
        where: {
          id_books: parseInt(id),
          id_user: deCoded_id_user,
        },
        data: newBody,
      })
      .then((data) => {
        res.send({
          message: "Success Update book",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Error While Update book",
          status: 500,
          error: error,
        });
      });
  },
  getBooksAll: (req, res) => {
    // const page = req.body.pagination;
    // console.log("====================================");
    // console.log(page);
    // console.log("====================================");
    // const booksPerPage = 5;
    // const offset = (page - 1) * booksPerPage;
    prisma
      .$queryRaw(
        "select * from books as B LEFT JOIN (select books_id,trunc(AVG(rating)::numeric,1) as rating from rating GROUP BY books_id) as R ON B.id_books = R.books_id ORDER BY id_books ASC;"
      )
      // .findMany({
      // include: {
      // rating: true,
      // },
      // take: booksPerPage,
      // orderBy: {
      //   id_books: "asc",
      // },
      // skip: offset,
      // })

      .then((data) => {
        for (i = 0; i < data.length; i++) {
          delete data[i].books_id;
        }

        res.status(200).send({
          message: "Success get all books",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error while get all books",
          status: 500,
          error,
        });
      });
  },
};
