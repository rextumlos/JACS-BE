const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BSONTypeError } = require("bson");
const { default: mongoose } = require("mongoose");

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
        const user = req.params.userId || req.body._userId;
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
        const userId = req.params.userId || req.body._userId;

        if (userId === undefined)
            res.status(403).json({
                status: 403,
                message: "_userId is required."
            })

        try {

            const user = await User.findById(mongoose.Types.ObjectId(userId));

            if (req.user.id === userId && user.isSeller || req.user.isAdmin) {
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