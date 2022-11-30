const { getAllUsers, getUserStatistics, updateUser, deleteUser, getUser, getUserById } = require("../controllers/users");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const express = require("express");
const router = express.Router();

// Get user by id
router.param("userId", getUserById);
// Get all users
router.get("/users", verifyTokenAndAdmin, getAllUsers);
// Get user statistics
router.get("/users/stats", verifyTokenAndAdmin, getUserStatistics);
// Get user
router.get("/users/:userId", verifyTokenAndAdmin, getUser);
// Update user
router.put("/users/:userId", verifyTokenAndAuthorization, updateUser);
// Delete user
router.delete("/users/:userId", verifyTokenAndAuthorization, deleteUser);


module.exports = router;
