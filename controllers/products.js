const Product = require("../models/Product");
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const SellerDetails = require("../models/SellerDetails");
const { validationResult } = require("express-validator");

exports.getProductById = (req, res, next, id) => {
    try {
        Product.findById(mongoose.Types.ObjectId(id)).exec((error, product) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!product)
                return res.status(400).json({
                    status: 400,
                    message: "Product not found."
                })
            else {
                req.product = product._doc;
                next();
            }
        })
    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.getSellerById = (req, res, next, id) => {
    try {
        SellerDetails.findById(mongoose.Types.ObjectId(id)).exec((error, seller) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!seller)
                return res.status(400).json({
                    status: 400,
                    message: "Seller not found."
                })
            else {
                req.seller = seller._doc;
                next();
            }
        })
    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.getAllProductsOfSeller = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.getProduct = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _sellerId, name, description, category, price, img, stock} = req.body;

    try {
        

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};