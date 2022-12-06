const express = require("express");
const { getAllTechnicians, getTechnicianById, addTechnicianById, updateTechnicianById, deleteTechnicianById } = require("../controllers/technicians");
const { getUserById } = require("../controllers/users");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");
const router = express.Router();

router.param("userId", getUserById)
// Get All Technicians
router.get("/technicians", getAllTechnicians)
// Technicians CRUD Operations
router.route("/technicians/:userId")
    .get(getTechnicianById)
    .post([], verifyTokenAndAuthorization, addTechnicianById)
    .put(verifyTokenAndAuthorization, updateTechnicianById)
    .delete(verifyTokenAndAuthorization, deleteTechnicianById);

module.exports = router;