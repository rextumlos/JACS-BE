const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { register, login, forgotpassword, confirmchangepass, resetpassword } = require("../controllers/auth");
const { resendverification } = require("../controllers/userDetails");
const { verifyEmailToken, getUserTokenByUserId } = require("../utils/emailVerification");

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
router.post("/resend",[
  body("email").isEmail().withMessage("Must be an email.")
], resendverification);

// Forgot password
router.post("/forgotpassword", [
  body("email").isEmail().withMessage("Must be an email.")
], forgotpassword);
router.put("/resetpassword/:userId/:token", resetpassword);

module.exports = router;
