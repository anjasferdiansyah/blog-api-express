const validator = require("validator");
const db = require("../models/index");
const bcrypt = require("bcrypt");

const registerValidator = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !lastName || !userName || !email || !password) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }
  if (!validator.isEmail(email, { host_whitelist: ["gmail.com"] })) {
    return res.status(400).send({
      message: "Email is not valid",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({
      message:
        "Password is not strong enough, at least 8 characters, one uppercase, one lowercase, one number and one special character",
    });
  }
  next();
};

const loginValidator = async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const getUser = await db.user.findOne({
    where: {
      userName,
    },
  });

  if (!getUser) {
    res.status(400).send({
      message: "User Not Found",
    });
  }

  const dataUser = getUser.dataValues;

  const comparedPassword = bcrypt.compareSync(password, dataUser.password);

  if (!comparedPassword) {
    return res.status(401).send({
      message: "Wrong Password",
    });
  }

  req.userInfo = dataUser;
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
};
