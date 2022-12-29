const { getProductById } = require("../controllers/products");
const addSpecification = require("../controllers/specifications/addSpecification");
const { verifyTokenAndSellerAuthorization } = require("../utils/verifyToken");

const router = require("express").Router();

router.param("productId", getProductById);

router.route("/specification/:productId")
    .get()
    .post(verifyTokenAndSellerAuthorization, addSpecification)
    .put()
    .delete();

module.exports = router;