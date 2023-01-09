const { addCart, getCartById, getCartOfUser, getCart, updateCart, deleteCart } = require("../controllers/cart");

const router = require("express").Router();
const { body } = require("express-validator");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");

router.param("cartId", getCartById);

router.route("/cart") // Get all carts, add cart, delete all carts
    .post(verifyTokenAndAuthorization, [
        body("_userId")
            .isLength({min: 1}).withMessage("_userId is required."),
        body("products.*")
            .not().isEmpty().withMessage("products is required.")
    ], addCart);

router.route("/cart/:userId") // Get all carts of user, delete carts of user
    .get(verifyTokenAndAuthorization, getCartOfUser)
    .delete(verifyTokenAndAuthorization, [
        body("cartId.*")
            .not().isEmpty().withMessage("cardId is/are required.")
    ], deleteCart);

router.route("/cart/:userId/:cartId") // Get a cart of user, update a cart of user
    .get(verifyTokenAndAuthorization, getCart)
    .put(verifyTokenAndAuthorization, updateCart);

module.exports = router;