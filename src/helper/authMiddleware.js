const jwt = require("jsonwebtoken");
const form = require("./form");

module.exports = {
  checkLogin: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    console.log("====================================");
    console.log("ini bearer", bearerToken);
    console.log("====================================");
    if (bearerToken === undefined) {
      console.log("====================================");
      console.log("RES ", res);
      console.log("====================================");
      console.log("ERROR");
      return form.error(
        res,
        "Please login first",
        401,
        "You need login to access it"
      );
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
