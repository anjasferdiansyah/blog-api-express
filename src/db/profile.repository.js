const prisma = require("../utils/prisma");

const findUserProfile = async (userId) => {
  const profile = await prisma.profile.findUnique(userId);
  return profile;
};

const createProfileUser = async (userId, data) => {
  const profile = await prisma.profile.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      userId,
    },
  });
  return profile;
};

const updateProfileUser = async (userId, data) => {
  const profile = await prisma.profile.update({
    where: {
      userId,
    },
    data,
  });
  return profile;
};

module.exports = {
  findUserProfile,
  createProfileUser,
  updateProfileUser,
};
