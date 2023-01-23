const express = require("express");
const { getAllTechnicians, getTechnicianById, addTechnicianById, updateTechnicianById, deleteTechnicianById, getTechnicianByUserId, confirmTech, rejectTech, uploadImage, deleteFiles, uploadDocs } = require("../controllers/technicians");
const { getUserTokenByUserId, verifyTechToken } = require("../utils/emailVerification");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndTechnicianAuthorization } = require("../utils/verifyToken");
const router = express.Router();
const { body } = require("express-validator");
const { addTechDetailsById, deleteTechDetailsById, getTechDetailsById, getAllTechDetails, updateTechDetailsById, resendTechEmail } = require("../controllers/techDetails");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
})

router.param("userId", getTechnicianByUserId);
router.param("techId", getUserTokenByUserId);

// Technicians CRUD Operations
router.route("/technicians")
    .get(verifyTokenAndAdmin, getAllTechnicians)
    .post([
        body("_userId")
            .isLength({ min: 1 }).withMessage("_userId is required."),
        body("governId")
            .not().isEmpty().withMessage("governId must have at least 1 file name."),
        body("certOfTrainings")
            .not().isEmpty().withMessage("certOfTrainings must have at least 1 file name."),
    ], verifyTokenAndAuthorization, addTechnicianById)
    .delete(verifyTokenAndAuthorization, deleteTechnicianById);

// Technicians details CRUD Operations
router.route("/technicians/details")
    .get(getAllTechDetails)
    .post(verifyTokenAndTechnicianAuthorization, [
        body("_userId")
            .isLength({ min: 1 }).withMessage("_userId is required."),
        body("yearsOfExperience")
            .isLength({min: 1}).withMessage("yearsOfExperience is required.")
            .isNumeric().withMessage("yearsOfExperience must be a number."),
        body("areaOfExpertise")
            .isLength({min: 1}).withMessage("areaOfExpertise is required."),
        body("levelOfExpertise")
            .isLength({min: 1}).withMessage("levelOfExpertise is required."),
        body("email")
            .isEmail().withMessage("email must be an Email.")
            .isLength({min: 1}).withMessage("email is required."),
        body("description")
            .isLength({min: 1}).withMessage("description is required."),
        body("workSetup")
            .isLength({min: 1}).withMessage("workSetup is required."),
    ], addTechDetailsById)
    .delete(verifyTokenAndTechnicianAuthorization, deleteTechDetailsById);

// Technician verification
router.get("/technicians/verify/:techId/:token", verifyTechToken);
router.post("/technicians/resend", [
    body("email").isEmail().withMessage("Must be an email.")
], resendTechEmail);

router.route("/technicians/images/:userId")
    .post(verifyTokenAndTechnicianAuthorization, upload.array("images", 10), uploadImage)
    .delete(verifyTokenAndTechnicianAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

router.route("/technicians/documents/:userId")
    .post(verifyTokenAndAuthorization, upload.array("documents", 10), uploadDocs)
    .delete(verifyTokenAndAuthorization, [
        body("fileUrls")
            .not().isEmpty().withMessage("fileUrls are required.")
    ], deleteFiles);

// Technicians CRUD Operations with params
router.route("/technicians/:userId")
    .get(verifyTokenAndAuthorization, getTechnicianById)
    .put(verifyTokenAndAuthorization, updateTechnicianById);

// Technicians details CRUD Operations with params
router.route("/technicians/:userId/details")
    .get(getTechDetailsById)
    .put(verifyTokenAndTechnicianAuthorization, updateTechDetailsById);

// Confirm as Technician
router.put("/confirmTech/:userId", verifyTokenAndAdmin, confirmTech);
// Reject as Technician
router.put("/rejectTech/:userId", verifyTokenAndAdmin, rejectTech);

module.exports = router;