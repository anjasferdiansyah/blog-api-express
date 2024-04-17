const { limit } = require("../knexmodels/knex");
const db = require("../models/index");

const getAllPosts = async (req, res) => {
  // filtering untuk mendapatkan post sesuai query mis: ?user_id=1
  const queryParams = req.query;
  // filtering berdasarkan user_id
  if (queryParams.user_id) {
    queryParams.user_id = {
      [db.Sequelize.Op.eq]: queryParams.user_id,
    };
  }

  // filtering berdasarkan title
  if (queryParams.title && queryParams.title !== "") {
    queryParams.title = {
      [db.Sequelize.Op.like]: `%${queryParams.title}%`,
    };
  }

  // filtering berdasarkan body
  if (queryParams.body && queryParams.body !== "") {
    queryParams.body = {
      [db.Sequelize.Op.like]: `%${queryParams.body}%`,
    };
  }

  try {
    const limit = parseInt(req.query.limit) || 10;
    delete queryParams.limit;

    const allPosts = await db.post.findAll(
      {
        where: queryParams,
        limit,
      } || {}
    );

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

    const postById = await db.post.findOne({
      where: {
        id,
      },
    });

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
    const { title, body } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const newPost = await db.post.create({
      title,
      body,
      user_id: userId,
    });

    return res.status(201).send({
      message: "Create Post Success",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatePost = await db.post.update(
      {
        title,
        body,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).send({
      message: "Update Post Success",
      data: updatePost,
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

    const deletePost = await db.post.destroy({
      where: {
        id,
      },
    });

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
