const express = require("express");
const {
  register,
  getAllUsers,
  login,
  uploadProfilePicture,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
} = require("../middlewares/validators");
const { uploadProfile } = require("../middlewares/upload");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Mendapatkan semua user
router.get("/", verifyToken, getAllUsers);

// Mendapatkan user berdasarkan id
router.get("/:id", verifyToken, getUserById);

// Register
router.post("/register", registerValidator, register);

// Login
router.post("/login", loginValidator, login);

// update user
router.put("/:id", verifyToken, updateUserValidator, updateUser);

// Delete user by admin
router.delete("/:id", verifyToken, isAdmin, deleteUser);

// update profile picture
router.post(
  "/uploadprofile",
  verifyToken,
  uploadProfile.single("foto"),
  uploadProfilePicture
);

module.exports = router;
