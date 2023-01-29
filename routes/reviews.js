const router = require("express").Router();
const { body } = require("express-validator");
const { getRefById, addReview, getReviewById, getAllReviewsOfRef, getReview, deleteReview, updateReview, uploadImage, deleteFiles, uploadDocs, getAverageOfReviews, likeReview, unlikeReview } = require("../controllers/reviews");
const { verifyTokenAndAuthorization, verifyTokenAndReviewAuthorization } = require("../utils/verifyToken");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

router.param("refId", getRefById);
router.param("reviewId", getReviewById);

router.post("/reviews", verifyTokenAndAuthorization, [
    body("_refId")
        .isLength({ min: 1 }).withMessage("_refId is required."),
    body("_userId")
        .isLength({ min: 1 }).withMessage("_userId is required."),
    body("stars")
        .isNumeric().withMessage("stars must be a number.")
        .isLength({ min: 1 }).withMessage("stars is required."),
    body("description")
        .isLength({ min: 1 }).withMessage("description is required.")
], addReview);

router.route("/reviews/:refId")
    .get(getAllReviewsOfRef) // Getting all reviews from referenced ID
    .delete(verifyTokenAndReviewAuthorization, deleteReview)

router.route("/reviews/:refId/review/:reviewId")
    .get(getReview) // Get review from referenced ID
    .put(verifyTokenAndReviewAuthorization, updateReview) // Update a review from referenced ID

router.get("/reviews/:refId/stats", getAverageOfReviews);

router.post("/reviews/:refId/review/:reviewId/like",
    verifyTokenAndAuthorization, likeReview)
router.post("/reviews/:refId/review/:reviewId/unlike",
    verifyTokenAndAuthorization, unlikeReview)

router.route("/reviews/:refId/review/:reviewId/images")
    .post(verifyTokenAndReviewAuthorization, upload.array("images", 10), uploadImage)
    .delete(verifyTokenAndReviewAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

router.route("/reviews/:refId/review/:reviewId/documents")
    .post(verifyTokenAndReviewAuthorization, upload.array("documents", 10), uploadDocs)
    .delete(verifyTokenAndReviewAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

module.exports = router;