const router = require("express").Router();
const { body } = require("express-validator");
const { getOrderById, addOrder, getOrderOfUser, deleteOrder, getOrder, updateOrder } = require("../controllers/orders");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");

router.param("orderId", getOrderById);

router.route("/order") // Get all orders, add order, delete all orders
    .post(verifyTokenAndAuthorization, [
        body("_userId")
            .isLength({ min: 1 }).withMessage("_userId is required."),
        body("products.*")
            .not().isEmpty().withMessage("products is required."),
        body("amount")
            .isLength({ min: 1 }).withMessage("amount is required.")
            .isNumeric().withMessage("amount must be a number."),
    ], addOrder);

router.route("/order/:userId") // Get all orders of user, delete orders of user
    .get(verifyTokenAndAuthorization, getOrderOfUser)
    .delete(verifyTokenAndAuthorization, [
        body("orderId.*")
            .not().isEmpty().withMessage("orderId is/are required.")
    ], deleteOrder);

router.route("/order/:userId/:orderId") // Get a order of user, update a order of user
    .get(verifyTokenAndAuthorization, getOrder)
    .put(verifyTokenAndAuthorization, updateOrder);

module.exports = router;