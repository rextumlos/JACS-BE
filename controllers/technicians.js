const Technician = require("../models/Technician");

exports.getAllTechnicians = async (req, res) => {
    try {
        //TODO: Add implementation

        res.send("Get all successful.")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.getTechnicianById = async (req, res) => {
    try {
        //TODO: Add implementation

        res.send("Get successful.")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.addTechnicianById = async (req, res) => {
    try {
        //TODO: Add implementation

        res.send("Post successful.")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.updateTechnicianById = async (req, res) => {
    try {
        //TODO: Add implementation

        res.send("Put successful.")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.deleteTechnicianById = async (req, res) => {
    try {
        //TODO: Add implementation

        res.send("Delete successful.")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}