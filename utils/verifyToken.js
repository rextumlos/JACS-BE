const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BSONTypeError } = require("bson");
const { default: mongoose } = require("mongoose");
const SellerDetails = require("../models/SellerDetails");
const Product = require("../models/Product");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (error, user) => {
            if (error) return res.status(403).json({
                status: 403,
                message: "Invalid token."
            });

            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({
            status: 401,
            message: "Authentication required."
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const user = req.params.userId || req.body.id || req.body._userId;
        if (req.user.id === user || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "Access denied."
            })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "Access denied."
            })
        }
    })
}

const verifyTokenAndSellerAuthorization = (req, res, next) => {

    verifyToken(req, res, async () => {
        try {
            let objectIds = [];
            let sellerId;
            if (req.body.productId) {
                const id = req.body.productId;
                for (let i = 0; i < id.length; i++) {
                    if (id[i] === "")
                        return res.status(400).json({
                            status: 400,
                            message: `id must not contain empty strings.`
                        });

                    const convertId = await mongoose.Types.ObjectId(id[i])

                    const findProduct = await Product.findById(convertId);
                    if (!findProduct)
                        return res.status(400).json({
                            status: 400,
                            message: `Product id: ${id[i]} not found.`
                        });

                    const seller = await SellerDetails.findById(findProduct._sellerId);
                    if (req.user.id !== seller._userId.toString() && !req.user.isAdmin)
                        return res.status(400).json({
                            status: 400,
                            message: `Cannot delete ${id[i]} because you do not own it.`
                        });

                    objectIds.push(seller._userId);
                }
            }

            if (req.params.productId) {
                const id = req.params.productId;
                const product = await Product.findById(mongoose.Types.ObjectId(id));
                if (!product)
                    return res.status(400).json({
                        status: 400,
                        message: `Product id: ${id} not found.`
                    });

                const seller = await SellerDetails.findById(product._sellerId);
                sellerId = seller._userId;
            }

            if (req.body._sellerId) {
                const id = req.body._sellerId
                const seller = await SellerDetails.findById(id)
                if (!seller)
                    return res.status(400).json({
                        status: 400,
                        message: `Seller id: ${id} not found.`
                    });

                sellerId = seller._userId;
            }

            const userId = req.params.userId || req.body._userId || objectIds[0] || sellerId;

            if (userId === undefined)
                res.status(403).json({
                    status: 403,
                    message: "_userId is required."
                })

            const user = await User.findById(mongoose.Types.ObjectId(userId));

            if (req.user.id === userId.toString() && user.isSeller || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json({
                    status: 403,
                    message: "Access denied."
                })
            }

        } catch (error) {
            if (error instanceof BSONTypeError)
                return res.status(400).json({
                    status: 400,
                    message: "Must be a valid id of user."
                })
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error
            })
        }

    })
}

const verifyTokenAndTechnicianAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        const userId = req.params.userId || req.body._userId;

        if (userId === undefined)
            res.status(403).json({
                status: 403,
                message: "_userId is required."
            })

        try {
            const user = await User.findById(mongoose.Types.ObjectId(userId));

            if (req.user.id === userId && user.isTech || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json({
                    status: 403,
                    message: "Access denied."
                })
            }

        } catch (error) {
            if (error instanceof BSONTypeError)
                return res.status(400).json({
                    status: 400,
                    message: "Must be a valid id of user."
                })
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error
            })
        }

    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization, verifyTokenAndTechnicianAuthorization };