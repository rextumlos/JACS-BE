const SellerDetails = require("../models/SellerDetails");

exports.getAllSellerDetails = async (req, res) => {
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

exports.getSellerDetailsById = async (req, res) => {
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

exports.addSellerDetailsById = async (req, res) => {
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

exports.updateSellerDetailsById = async (req, res) => {
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

exports.deleteSellerDetailsById = async (req, res) => {
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