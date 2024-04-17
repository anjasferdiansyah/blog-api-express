const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

// get all posts
router.get("/", getAllPosts);

// get post by id
router.get("/:id", getPostById);

// create post
router.post("/create", verifyToken, createPost);

// update post
router.patch("/:id", verifyToken, updatePost);

// delete post
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
