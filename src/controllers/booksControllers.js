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
    const { body } = req;
    const newBody = {
      ...body,
      ISBN: parseInt(body.ISBN),
      pages: parseInt(body.pages),
      id_category: parseInt(body.id_category),
      id_user: parseInt(body.id_user),
      id_discussion: parseInt(body.id_discussion),
      id_rate: parseInt(body.id_rate),
    };
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
    const { id } = req.params;
    console.log("ini id", id);
    prisma.books
      .delete({
        where: {
          id_books: parseInt(id),
        },
      })
      .then((data) => {
        res.send({
          message: "Success delete book",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({ message: "Error deleting book", status: 500, error: error });
      });
  },
  editBook: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      ISBN: parseInt(body.ISBN),
      pages: parseInt(body.pages),
      id_category: parseInt(body.id_category),
      id_user: parseInt(body.id_user),
      id_discussion: parseInt(body.id_discussion),
      id_rate: parseInt(body.id_rate),
    };
    prisma.books
      .update({
        where: {
          id_books: parseInt(id),
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
};
