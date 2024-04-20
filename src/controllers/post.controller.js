const {
  findPostsByQuery,
  creatingPost,
  updatingPost,
  deletingPost,
  findPostById,
} = require("../db/post.repository");
const { connectOrCreateTag } = require("../db/tag.repository");

const getAllPosts = async (req, res) => {
  const { query } = req;

  try {
    const allPosts = await findPostsByQuery(query);

    return res.status(200).send({
      message: "Get All Posts Success",
      data: allPosts,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const postById = await findPostById(id);

    return res.status(200).send({
      message: "Get Post Success",
      data: postById,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.user.id;

    // Cari tag yang sudah ada dalam database apabila tidak ada, buat yang baru
    const connectOrCreate = await connectOrCreateTag(tags);

    // Buat post dan hubungkan dengan tag yang sudah ada atau baru dibuat
    const createdPost = await creatingPost(userId, {
      title,
      body,
      tags: connectOrCreate,
    });

    return res.status(201).send({
      message: "Create Post Success",
      data: { ...createdPost, tags: connectOrCreate },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);
    const { title, body, tags } = req.body;

    let data = { title, body };

    // Cari tag yang sudah ada dalam database
    let connectOrCreate = null;
    if (tags) {
      connectOrCreate = await connectOrCreateTag(tags);
      data = { ...data, tags: connectOrCreate };
    }

    const updatePost = await updatingPost(postId, data);

    console.log(updatePost);

    res.status(201).send({
      message: "Update Post Success",
      data: {
        ...updatePost,
        tags: connectOrCreate,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    const deletePost = await deletingPost(postId);

    return res.status(201).send({
      message: "Delete Post Success",
      data: deletePost,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
