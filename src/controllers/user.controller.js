const knex = require("../knexmodels/knex");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !lastName || !userName || !email || !password) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  //   const newUser = await knex("users").insert({
  //     firstName,
  //     lastName,
  //     userName,
  //     email,
  //     password,
  //   });

  const hashPassword = bcrypt.hashSync(password, 8);

  const regis = await db.user.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashPassword,
  });

  return res.status(201).send({
    message: "Create User Success",
    data: regis,
  });
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
  const allUsers = await knex.select().from("users");

  return res.status(200).send({
    message: "Get All Users Success",
    data: allUsers,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userById = await db.user.findOne({
    where: {
      id,
    },
  });

  return res.status(200).send({
    message: "Get User Success",
    data: userById,
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, userName, email, password } = req.body;

    const updateUser = await db.user.update(
      {
        firstName,
        lastName,
        userName,
        email,
        password,
      },
      {
        where: {
          id,
        },
      }
    );

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

  const updateFoto = await db.user.update(
    {
      picture: foto.path,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  return res.status(201).send({
    message: "Update Success",
    data: updateFoto,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deleteUser = await db.user.destroy({
    where: {
      id,
    },
  });

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
