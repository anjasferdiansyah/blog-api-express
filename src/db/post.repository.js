const prisma = require("../utils/prisma");

const findPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const findPostsByQuery = async (query) => {
  const queries = {};
  // Jika ada query tags, tambahkan filter
  if (query.tags) {
    queries.tags = {
      some: {
        id: parseInt(query.tags),
      },
    };
  }
  // Jika ada query title, tambahkan filter
  if (query.title) {
    queries.title = {
      contains: `%${query.title}%`,
    };
  }

  // Jika ada query body, tambahkan filter
  if (query.body) {
    queries.body = {
      contains: `%${query.body}%`,
    };
  }

  // Jika ada query userId, tambahkan filter
  if (query.userId) {
    queries.userId = query.userId;
  }

  console.log(queries);

  const posts = await prisma.post.findMany({
    where: queries,
    include: {
      tags: true,
    },
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
  const postData = {};

  if (data.title && data.title.length > 0) {
    postData.title = data.title;
  }

  if (data.body && data.body.length > 0) {
    postData.body = data.body;
  }

  if (data.tags && data.tags.length > 0) {
    postData.tags = { connect: data.tags };
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: postData,
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
