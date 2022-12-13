const express = require("express");
const { getAllSellerDetails, updateSellerDetailsById, addSellerDetailsById, deleteSellerDetailsById, getSellerDetailsById, checkSeller, resendSellerEmail } = require("../controllers/sellerDetails");
const { getSellerById, addSellerById, updateSellerById, deleteSellerById, getAllSellers, getSellerByUserId, confirmSeller, rejectSeller } = require("../controllers/sellers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization } = require("../utils/verifyToken");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const { getUserTokenByUserId ,verifySellerToken } = require("../utils/emailVerification");

router.param("userId", getSellerByUserId);

// Seller email verification
router.param("sellerId", getUserTokenByUserId);

router.get("/sellers/verify/:sellerId/:token", verifySellerToken);
router.post("/sellers/resend",[
    body("email").isEmail().withMessage("Must be an email.")
  ], resendSellerEmail);

// Get All Sellers
router.get("/sellers/all", verifyTokenAndAdmin, getAllSellers);
// Sellers CRUD Operations
router.route("/sellers/:userId")
    .get(verifyTokenAndAuthorization, getSellerById)
    .post([
        body("typeOfSeller", "Type of seller is required.").isLength({ min: 1 }),
        body("governId").isArray({ min: 1 }).withMessage("Government ID link/s is/are required in an array."),
        body("proofOfBankAcc").isArray({ min: 1 }).withMessage("Proof of bank account link/s is/are required in an array."),
    ], verifyTokenAndAuthorization, addSellerById)
    .put(verifyTokenAndAuthorization, updateSellerById)
    .delete(verifyTokenAndAuthorization, deleteSellerById);
// Confirm Seller
router.put("/confirmSeller/:userId", verifyTokenAndAdmin, confirmSeller);
// Reject Seller
router.put("/rejectSeller/:userId", verifyTokenAndAdmin, rejectSeller);

// Get all seller details
router.get("/sellers", getAllSellerDetails);
// Seller details CRUD Operations
router.route("/sellers/:userId/details")
    .get(getSellerDetailsById)
    .post(verifyTokenAndSellerAuthorization, [
        body("storeName", "Store Name is required.")
            .isLength({ min: 1 }),
        body("contactNo")
            .isMobilePhone().withMessage("Contact number is required."),
        body("email")
            .isEmail().withMessage("Must be an email."),
    ], addSellerDetailsById)
    .put(verifyTokenAndSellerAuthorization,[
        check("storeName")
            .isLength({ min: 1 }).withMessage("Must be at least 1 chars long."),
        check("contactNo")
            .isMobilePhone().withMessage("Must be a mobile number."),
        check("email")
            .isEmail().withMessage("Must be an email.")
    ], updateSellerDetailsById)
    .delete(verifyTokenAndSellerAuthorization, deleteSellerDetailsById);



module.exports = router;