const express = require("express");
const {
  register,
  getAllUsers,
  login,
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
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Mendapatkan semua user
router.get("/", verifyToken, isAdmin, getAllUsers);

// Mendapatkan user berdasarkan id
router.get("/:id", verifyToken, getUserById);

// Register
router.post("/register", registerValidator, register);

// Login
router.post("/login", loginValidator, login);

// update user
router.patch("/", verifyToken, updateUserValidator, updateUser);

// Delete user by admin
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
