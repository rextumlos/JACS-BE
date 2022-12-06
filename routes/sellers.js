const express = require("express");
const { getSellerById, addSellerById, updateSellerById, deleteSellerById, getAllSellers } = require("../controllers/sellers");
const { getUserById } = require("../controllers/users");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");
const router = express.Router();

router.param("userId", getUserById);
// Get All Sellers
router.get("/sellers", getAllSellers);
// Sellers CRUD Operations
router.route("/sellers/:userId")
    .get(getSellerById)
    .post([], verifyTokenAndAuthorization, addSellerById)
    .put(verifyTokenAndAuthorization, updateSellerById)
    .delete(verifyTokenAndAuthorization, deleteSellerById);

module.exports = router;