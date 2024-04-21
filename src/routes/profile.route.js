const express = require("express");
const { upload } = require("../middlewares/upload");
const {
  getUserProfile,
  createProfile,
  updateProfile,
  uploadProfilePicture,
} = require("../controllers/profile.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const config = require("../config/firebase.config");
const { initializeApp } = require("firebase/app");

const router = express.Router();

initializeApp(config.firebaseConfig);

// get all posts
router.get("/", verifyToken, getUserProfile);

router.post("/create", verifyToken, createProfile);

router.patch("/", verifyToken, updateProfile);

router.post(
  "/upload",
  verifyToken,
  upload.single("picture"),
  uploadProfilePicture
);
// router.post(
//   "/upload",
//   verifyToken,
//   uploadProfile.single("picture"),
//   uploadProfile
// );

// create post

module.exports = router;
