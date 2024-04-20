/* eslint-disable no-undef */
const {
  createUser,
  findAllUsers,
  findUserById,
  updatingUser,
  deletingUser,
} = require("../db/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 8);

    const regis = await createUser({
      userName,
      email,
      password: hashPassword,
    });

    return res.status(201).send({
      message: "Create User Success",
      data: regis,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const login = async (req, res) => {
  const data = req.userInfo;

  const token = jwt.sign(
    {
      id: data.id,
      userName: data.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).send({
    message: "Login Success",
    data: token,
  });
};

const getAllUsers = async (req, res) => {
  const allUsers = await findAllUsers();

  return res.status(200).send({
    message: "Get All Users Success",
    data: allUsers,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userById = await findUserById(id);

  return res.status(200).send({
    message: "Get User Success",
    data: userById,
  });
};

const updateUser = async (req, res) => {
  try {
    const id = req.user.id;

    const { email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 8);

    const updateUser = await updatingUser(id, {
      email,
      password: hashPassword,
    });

    return res.status(201).send({
      message: "Update Success",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  const user = req.user;
  const foto = req.file;

  console.log(user);
  console.log(foto);


  return res.status(201).send({
    message: "Update Success",
    data: updateFoto,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deleteUser = await deletingUser(id);

  return res.status(200).send({
    message: "Delete Success",
    data: deleteUser,
  });
};

module.exports = {
  register,
  getAllUsers,
  login,
  getUserById,
  uploadProfilePicture,
  updateUser,
  deleteUser,
};
