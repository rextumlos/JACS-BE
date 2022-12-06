const Seller = require("../models/Seller");

exports.getAllSellers = async (req, res) => {
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

exports.getSellerById = async (req, res) => {
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

exports.addSellerById = async (req, res) => {
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

exports.updateSellerById = async (req, res) => {
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

exports.deleteSellerById = async (req, res) => {
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