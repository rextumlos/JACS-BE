const { getAllUsers, getUserStatistics, updateUser, deleteUser, getUser, getUserById } = require("../controllers/users");
const { getAllUserDetails, getUserDetail, addUserDetail, updateUserDetail, deleteUserDetail } = require("../controllers/userDetails");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

// Get user by id
router.param("userId", getUserById);

// Get all users
router.get("/users/all", verifyTokenAndAdmin, getAllUsers);
// Get user statistics
router.get("/users/stats", verifyTokenAndAdmin, getUserStatistics);
// Get user
router.get("/users/:userId", verifyTokenAndAuthorization, getUser);
// Update user
router.put("/users/:userId", verifyTokenAndAuthorization, updateUser);
// Delete user
router.delete("/users/:userId", verifyTokenAndAuthorization, deleteUser);

// For user details routes
// Get all user details
router.get("/users", getAllUserDetails);
// Get user detail
router.get("/users/:userId/details", getUserDetail);
// Add user detail
router.post("/users/:userId/details", [
  body("firstName").isLength({min: 1}).withMessage("First name is required."),
  body("lastName").isLength({min: 1}).withMessage("Last name is required."),
  body("email").isEmail().withMessage("Invalid email."),
  body("contactNo").isMobilePhone().withMessage("Must be mobile number."),
], verifyTokenAndAuthorization, addUserDetail);
// Update user detail
router.put("/users/:userId/details",verifyTokenAndAuthorization, updateUserDetail);
// Delete user detail
router.delete("/users/:userId/details",verifyTokenAndAuthorization, deleteUserDetail);


module.exports = router;
