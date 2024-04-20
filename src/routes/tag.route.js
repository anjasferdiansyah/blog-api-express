const express = require("express");
const { getAllTags, getTagById } = require("../controllers/tag.controller");

const router = express.Router();

// get all posts
router.get("/", getAllTags);

router.get("/:id", getTagById);

// create post

module.exports = router;
