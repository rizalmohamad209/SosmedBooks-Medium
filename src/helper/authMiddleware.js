const jwt = require("jsonwebtoken");
module.exports = {
  checkLogin: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    console.log("====================================");
    console.log("ini bearer", bearerToken);
    console.log("====================================");
    if (bearerToken === undefined) {
      console.log("ERROR");
      res.status(401).send({
        message: "Please Login First",
        status: 401,
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
