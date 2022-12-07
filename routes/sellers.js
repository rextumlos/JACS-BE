const express = require("express");
const { getAllSellerDetails, updateSellerDetailsById, addSellerDetailsById, deleteSellerDetailsById, getSellerDetailsById } = require("../controllers/sellerDetails");
const { getSellerById, addSellerById, updateSellerById, deleteSellerById, getAllSellers, getSellerByUserId, confirmSeller, rejectSeller } = require("../controllers/sellers");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization } = require("../utils/verifyToken");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.param("userId", getSellerByUserId);
// Get All Sellers
router.get("/sellers/all", verifyTokenAndAdmin, getAllSellers);
// Sellers CRUD Operations
router.route("/sellers/:userId")
    .get(verifyTokenAndAuthorization, getSellerById)
    .post([
        body("typeOfSeller", "Type of seller is required.").isLength({min: 1}),
        body("governId").isArray({min: 1}).withMessage("Government ID link/s is/are required in an array."),
        body("proofOfBankAcc").isArray({min: 1}).withMessage("Proof of bank account link/s is/are required in an array."),
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
    .post(verifyTokenAndSellerAuthorization, addSellerDetailsById)
    .put(verifyTokenAndSellerAuthorization, updateSellerDetailsById)
    .delete(verifyTokenAndSellerAuthorization, deleteSellerDetailsById);

module.exports = router;