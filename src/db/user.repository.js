const prisma = require("../utils/prisma");

const createUser = async (data) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

const findAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserByUserName = async (userName) => {
  const user = await prisma.user.findUnique({
    where: {
      userName,
    },
  });
  return user;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const updatingUser = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return user;
};

const deletingUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByUserName,
  updatingUser,
  deletingUser,
};
