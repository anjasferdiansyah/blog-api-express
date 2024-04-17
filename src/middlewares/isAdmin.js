const db = require("../models/index");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];

  const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

  const verifyAdmin = await db.user.findOne({
    where: {
      id: user.id,
    },
  });

  if (verifyAdmin.roles !== "admin") {
    return res.status(403).json({
      message: "Unauthorized!, you are not admin",
    });
  }
  next();
};
module.exports = isAdmin;
