const { getAllUsers, getUserStatistics, updateUser, deleteUser, getUser, getUserById, uploadImage, uploadDocs, deleteImage } = require("../controllers/users");
const { getAllUserDetails, getUserDetail, addUserDetail, updateUserDetail, deleteUserDetail } = require("../controllers/userDetails");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
})

// Get user by id
router.param("userId", getUserById);

router.route("/users/images/:userId")
  .post(verifyTokenAndAuthorization, upload.array("images", 10), uploadImage)
  .delete(verifyTokenAndAuthorization, [
    body("imageUrls")
      .not().isEmpty().withMessage("imageUrls are required.")
  ], deleteImage)

router.route("/users/documents/:userId")
  .post(verifyTokenAndAuthorization, upload.array("files", 10), uploadDocs);

// For user details routes
router.route("/users/details")
  .get(getAllUserDetails)
  .post(verifyTokenAndAuthorization, [
    body("_userId")
      .isLength({ min: 1 }).withMessage("_userId is required."),
    body("firstName")
      .isLength({ min: 1 }).withMessage("First name is required."),
    body("lastName")
      .isLength({ min: 1 }).withMessage("Last name is required."),
    body("email")
      .isEmail().withMessage("Invalid email."),
    body("contactNo")
      .isMobilePhone().withMessage("Must be mobile number."),
  ], addUserDetail)
  .delete(verifyTokenAndAuthorization, [
    body("id")
      .isLength({ min: 1 }).withMessage("_userId is required.")
  ], deleteUserDetail);

// Get all users and delete user
router.route("/users")
  .get(verifyTokenAndAdmin, getAllUsers)
  .delete(verifyTokenAndAuthorization, [
    body("id")
      .isLength({ min: 1 }).withMessage("_userId is required.")
  ], deleteUser);

// Get user statistics
router.get("/users/stats", verifyTokenAndAdmin, getUserStatistics);

// Get and Update by Id of User Details
router.route("/users/:userId/details")
  .get(getUserDetail)
  .put(verifyTokenAndAuthorization, updateUserDetail);

// Get user by id and update user by id
router.route("/users/:userId")
  .get(verifyTokenAndAuthorization, getUser)
  .put(verifyTokenAndAuthorization, updateUser);


module.exports = router;
