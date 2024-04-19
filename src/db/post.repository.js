const prisma = require("../utils/prisma");

const findPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const findPostsByQuery = async (query) => {
  const posts = await prisma.post.findMany({
    where: query,
  });
  return posts;
};

const findPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return post;
};

const creatingPost = async (userId, data) => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      body: data.body,
      userId: userId,
      tags: {
        connect: data.tags,
      },
    },
  });
  return post;
};

const updatingPost = async (id, data) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      body: data.body,
      userId: data.userId,
      tags: {
        connect: data.tags,
      },
    },
  });
  return post;
};

const deletingPost = async (id) => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return post;
};

module.exports = {
  findPosts,
  findPostsByQuery,
  findPostById,
  creatingPost,
  updatingPost,
  deletingPost,
};
