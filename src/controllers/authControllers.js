const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: (req, res) => {
    const Data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const saltRounds = 10;
    bcrypt.hash(Data.password, saltRounds, (err, hashPassword) => {
      const newData = {
        ...Data,
        password: hashPassword,
      };
      prisma.user
        .create({
          data: newData,
        })
        .then((data) => {
          res.send({
            message: "Success Sign Up",
            status: 200,
            data: data,
          });
        })
        .catch((err) => {
          res.send({
            message: "Error Sign Up",
            status: 200,
            error: err,
          });
        });
    });
  },
  signIn: (req, res) => {
    const body = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("====================================");
    console.log(body.password);
    console.log("====================================");
    prisma.user
      .findFirst({
        where: {
          email: body.email,
        },
      })
      .then((data) => {
        if (!data) {
          res.send({
            message: "Error Login User Not Found",
            status: 404,
          });
        } else {
          console.log("====================================");
          console.log("ini passwordnya", data.password);
          console.log("====================================");
          const isValid = bcrypt.compareSync(body.password, data.password);
          if (!isValid) {
            res.send({
              message: "Error Login ",
              status: 404,
              Error: "Password Is Wrong",
            });
          } else {
            const payload = {
              username: data.username,
              email: data.email,
            };

            const token = jwt.sign(payload, "RIZAL123", {
              expiresIn: 86400,
            });
            const newData = {
              ...data,
              token: token,
            };
            res.send({
              message: "Success Login",
              status: 200,
              data: newData,
            });
          }
        }
      })
      .catch((error) => {
        res.send({
          message: "Login Error",
          status: 404,
          error: error,
        });
      });
  },
};
