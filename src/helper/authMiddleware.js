const jwt = require("jsonwebtoken");

module.exports = {
  checkLogin: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    console.log("====================================");
    console.log("ini bearer", bearerToken);
    console.log("====================================");
    if (bearerToken === undefined) {
      res.send({
        message: "Please Login First",
        status: 401,
        error: "Login",
      });
    } else {
      console.log("SUCCESS");
      const token = req.header("x-access-token").split(" ")[1];
      try {
        const decodeToken = jwt.verify(token, "RIZAL123");
        req.decodeToken = decodeToken;
        next();
      } catch (error) {
        res.send({
          message: "Invalid token",
          status: 401,
        });
      }
    }
  },
};
