const { getAllCategories, addCategory, getAllProductsOfCategory, getCategory, updateCategory, deleteCategory, getCategoryById } = require("../controllers/categories");
const { verifyTokenAndSellerAuthorization, verifyTokenAndAdmin } = require("../utils/verifyToken");

const { body } = require("express-validator");

const router = require("express").Router();

router.param("id", getCategoryById); // Get category by Id

router.route("/category")
    .get(getAllCategories) // Get all categories
    .post([
        body("name")
        .isLength({min: 1}).withMessage("name is required."),
        body("type")
        .isLength({min: 1}).withMessage("type is required.")
    ], verifyTokenAndAdmin, addCategory) // Add new category
    .delete([
        body("id")
        .isLength({min: 1}).withMessage("id is required.")
    ], verifyTokenAndAdmin, deleteCategory); // Deletes a category

router.route("/category/:id")
    .get(getCategory) // Get category
    .put(verifyTokenAndAdmin, updateCategory) // Update category

module.exports = router;