const jwt = require("jsonwebtoken");
module.exports = {
  checkLogin: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      res.send({
        message: "Please Login First",
        status: 401,
      });
    } else {
      const token = req.header("x-access-token").split(" ")[1];
      try {
        const decodeToken = jwt.verify(token, "RIZAL123");
        req.decodeToken = decodeToken;
        next();
      } catch (error) {
        res.send({ message: "Invalid token", status: 403 });
      }
    }
  },
};
