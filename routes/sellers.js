const express = require("express");
const { getAllSellerDetails, updateSellerDetailsById, addSellerDetailsById, deleteSellerDetailsById, getSellerDetailsById, checkSeller, resendSellerEmail, getStoreById, getStore } = require("../controllers/sellerDetails");
const { getSellerById, addSellerById, updateSellerById, deleteSellerById, getAllSellers, getSellerByUserId, confirmSeller, rejectSeller, uploadImage, deleteFiles, uploadDocs } = require("../controllers/sellers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization } = require("../utils/verifyToken");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const { getUserTokenByUserId, verifySellerToken } = require("../utils/emailVerification");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
})

router.param("userId", getSellerByUserId);
router.param("sellerId", getUserTokenByUserId);
router.param("storeId", getStoreById);

router.get("/sellers/verify/:sellerId/:token", verifySellerToken);
router.post("/sellers/resend", [
    body("email").isEmail().withMessage("Must be an email.")
], resendSellerEmail);

// Sellers CRUD Operations
router.route("/sellers")
    .get(verifyTokenAndAdmin, getAllSellers)
    .post(verifyTokenAndAuthorization, [
        body("_userId", "_userId is required.")
            .isLength({ min: 1 }),
        body("typeOfSeller", "Type of seller is required.")
            .isLength({ min: 1 }),
        body("documents.*")
            .not().isEmpty().withMessage("Documents must have at least 1 file name.")
    ], addSellerById)
    .delete(verifyTokenAndAuthorization, [
        body("_userId", "_userId is required.")
            .isLength({ min: 1 }),
    ], deleteSellerById);

router.route("/sellers/images/:userId")
    .post(verifyTokenAndSellerAuthorization, upload.array("images", 10), uploadImage)
    .delete(verifyTokenAndSellerAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

router.route("/sellers/documents/:userId")
    .post(verifyTokenAndSellerAuthorization, upload.array("documents", 10), uploadDocs)
    .delete(verifyTokenAndSellerAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

// Get all seller details and delete a seller detail
router.route("/sellers/details")
    .get(getAllSellerDetails)
    .post(verifyTokenAndSellerAuthorization, [
        body("_userId", "_userId is required.")
            .isLength({ min: 1 }),
        body("storeName", "Store Name is required.")
            .isLength({ min: 1 }),
        body("contactNo")
            .isMobilePhone().withMessage("Contact number is required."),
        body("email")
            .isEmail().withMessage("Must be an email."),
    ], addSellerDetailsById)
    .delete(verifyTokenAndSellerAuthorization, [
        body("_userId", "_userId is required.")
            .isLength({ min: 1 }),
    ], deleteSellerDetailsById);

// Get seller by id and update by id
router.route("/sellers/:userId")
    .get(verifyTokenAndAuthorization, getSellerById)
    .put(verifyTokenAndAuthorization, updateSellerById)

// Confirm Seller
router.put("/confirmSeller/:userId", verifyTokenAndAdmin, confirmSeller);
// Reject Seller
router.put("/rejectSeller/:userId", verifyTokenAndAdmin, rejectSeller);

// Seller details CRUD Operations
router.route("/sellers/:userId/details")
    .get(getSellerDetailsById)
    .put(verifyTokenAndSellerAuthorization, updateSellerDetailsById)

router.get("/store/:storeId", getStore);

module.exports = router;