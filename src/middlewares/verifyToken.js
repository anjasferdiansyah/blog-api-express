const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }

    // eslint-disable-next-line no-undef
    let checkToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    if (!checkToken) {
      return res.status(401).send({
        message: "Failed to authenticate token.",
      });
    }

    req.user = checkToken;

    next();
  } catch (error) {
    return res.status(401).send({
      message: error,
    });
  }
};

module.exports = {
  verifyToken,
};
