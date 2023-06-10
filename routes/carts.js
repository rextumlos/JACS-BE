const { addCart, getCartByUserId, getCartOfUser, getCart, updateCart, deleteCart } = require("../controllers/carts");

const router = require("express").Router();
const { body } = require("express-validator");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");

router.param("userId", getCartByUserId);

router.route("/cart") // add cart
    .post(verifyTokenAndAuthorization, [
        body("_userId")
            .isLength({min: 1}).withMessage("_userId is required."),
        body("products.*")
            .not().isEmpty().withMessage("products is required.")
    ], addCart);

router.route("/cart/:userId") // Get cart of user, delete carts of user
    .get(verifyTokenAndAuthorization, getCart)
    .put(verifyTokenAndAuthorization, updateCart);

module.exports = router;