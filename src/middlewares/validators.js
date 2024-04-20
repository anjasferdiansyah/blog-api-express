const validator = require("validator");
const bcrypt = require("bcrypt");
const { findUserByUserName } = require("../db/user.repository");

const registerValidator = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const existingUser = await findUserByUserName(userName);
  console.log(existingUser);

  if (existingUser) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

  if (!userName || !email || !password) {
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

const updateUserValidator = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "No data to update",
    });
  }

  if (email && !validator.isEmail(email, { host_whitelist: ["gmail.com"] })) {
    return res.status(400).send({
      message: "Email is not valid",
    });
  }

  if (password && !validator.isStrongPassword(password)) {
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

  const getUser = await findUserByUserName(userName);
  console.log(getUser);
  if (!getUser) {
    res.status(400).send({
      message: "User Not Found",
    });
  }

  const dataUser = getUser;

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
  updateUserValidator,
};
