const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { register, login } = require("../controllers/auth");
const { verifyEmailToken, getTokenByUserId, getUserTokenByUserId } = require("../utils/emailVerification");


// Register
router.post("/register", [
  body("username").isLength({min: 5}).withMessage("Username must be at least 5 chars long."),
  body("password").isLength({min: 5}).withMessage("Password must be at least 5 chars long.")
] , register);

// Login
router.post("/login", [
  body("username").isLength({min: 5}).withMessage("Username must be at least 5 chars long."),
  body("password").isLength({min: 5}).withMessage("Password must be at least 5 chars long.")
] , login);

router.param("userId", getUserTokenByUserId);
// Verify
router.get("/verify/:userId/:token", verifyEmailToken);

module.exports = router;
