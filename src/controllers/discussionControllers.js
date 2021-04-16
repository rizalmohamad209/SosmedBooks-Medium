const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getDiscussionsByIdBooks: (req, res) => {
    let { id } = req.params;
    prisma.discussion
      .findMany({
        where: {
          id_books: parseInt(id),
        },
        include: {
          user: {
            select: {
              name_user: true,
              foto_user: true,
            },
          },
        },
      })
      .then((data) => {
        res.send({
          message: "Success get data",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "Failed get Data",
          status: 500,
          error: error,
        });
      });
  },
  createOnediscussion: (req, res) => {
    const { body } = req;
    const deCoded_id_user = req.decodeToken.id_user;
    const newBody = {
      ...body,
      id_books: parseInt(body.id_books),
      id_user: deCoded_id_user,
    };
    prisma.discussion
      .create({
        data: newBody,
      })
      .then((data) => {
        res.send({
          message: "Sucsess add Discussion",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.send({
          message: "failed to add discussion",
          status: 400,
          error: error,
        });
      });
  },
};
