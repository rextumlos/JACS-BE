const router = require("express").Router();
const { getAllProducts, addProduct, getAllProductsOfSeller, getProductById, getSellerById, getProduct, updateProduct, deleteProduct } = require("../controllers/products");
const { verifyTokenAndSellerAuthorization } = require("../utils/verifyToken");
const { body } = require("express-validator");

router.param("productId", getProductById);
router.param("sellerId", getSellerById);

router.route("/products")
  .get(getAllProducts)  // Get all products
  .post([
    body("_sellerId")
      .isLength({ min: 1 }).withMessage("_sellerId is required"),
    body("name")
      .isLength({ min: 1 }).withMessage("name is required."),
    body("description")
      .isLength({ min: 1 }).withMessage("description is required."),
    body("category")
      .isLength({ min: 1 }).withMessage("category is required."),
    body("price")
      .isLength({ min: 1 }).withMessage("price is required.")
      .isNumeric().withMessage("price must be a Number"),
    body("img")
      .not().isEmpty().withMessage("img is required."),
    body("stock")
      .isLength({ min: 1 }).withMessage("stock is required.")
      .isNumeric().withMessage("stock must be a Number"),
  ], verifyTokenAndSellerAuthorization, addProduct) // Adds a new product

  .delete([
    body("productId")
      .not().isEmpty().withMessage("productId is required."),
  ], verifyTokenAndSellerAuthorization, deleteProduct) // Deletes a product using product id;  // Add product

router.route("/products/store/:sellerId")
  .get(getAllProductsOfSeller)  // Get all products from a seller using seller id

router.route("/products/:productId")
  .get(getProduct) // Get a product using product id
  .put(verifyTokenAndSellerAuthorization, updateProduct) // Updates a product using product id

module.exports = router;
