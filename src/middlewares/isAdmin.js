const jwt = require("jsonwebtoken");
const { findUserById } = require("../db/user.repository");

const isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];

  // eslint-disable-next-line no-undef
  const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

  const verifyAdmin = await findUserById(user.id);

  if (verifyAdmin.role !== "ADMIN") {
    return res.status(403).json({
      message: "Unauthorized!, you are not admin",
    });
  }
  next();
};
module.exports = isAdmin;
