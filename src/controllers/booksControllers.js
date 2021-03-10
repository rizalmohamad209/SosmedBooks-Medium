const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

module.exports = {
  getBooks: (req, res) => {
    const deCoded_id_user = req.decodeToken.id_user;
    prisma.books
      .findMany({
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
      ISBN: parseInt(body.ISBN),
      pages: parseInt(body.pages),
      id_category: parseInt(body.id_category),
      cover__book: req.file.path,
      id_user: deCoded_id_user,
    };
    console.log("====================================");
    console.log("ini new body", newBody);
    console.log("====================================");
    prisma.books
      .create({
        data: newBody,
      })
      .then((data) => {
        res.send({
          message: "Data Books Success Upload",
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        res.send({ message: "Error While Add data", status: 500, error: err });
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
    const page = req.body.pagination;
    console.log("====================================");
    console.log(page);
    console.log("====================================");
    const booksPerPage = 5;
    const offset = (page - 1) * booksPerPage;
    prisma.books
      .findMany({
        take: booksPerPage,
        orderBy: {
          id_books: "asc",
        },
        skip: offset,
      })
      .then((data) => {
        res.status(200).send({
          message: "Seuccess Get All Books",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error While Get All Books",
          status: 500,
          error,
        });
      });
  },
};
