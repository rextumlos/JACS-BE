const User = require("../models/User");
const CryptoJS = require("crypto-js");
const UserDetails = require("../models/UserDetails");
const mongoose = require("mongoose");
const { BSONTypeError } = require("bson");
const { validationResult } = require("express-validator");
const Seller = require("../models/Seller");
const SellerDetails = require("../models/SellerDetails");
const Technician = require("../models/Technician");
const TechnicianDetails = require("../models/TechnicianDetails");
const { upload, getPathStorageFromUrl, getUserIdFromFilePath, deleteFile } = require("../utils/firebaseStorage");

exports.uploadImage = async (req, res) => {
    const images = req?.files;
    const userId = req?.profile._id;

    if (!images)
        return res.status(400).json({
            status: 400,
            message: `Insert images to upload.`,
        })

    try {
        let result = [];

        const uploadImages = await new Promise((resolve, reject) => {
            images.forEach((image, index, array) => {
                let ref = `users/${userId}/images/${image.originalname}`;
                upload(image, ref).then((data, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    result.push(data);
                    if (index === array.length - 1)
                        resolve();
                });
            });

        }).then(() => {

            return res.status(200).json({
                status: 200,
                message: `Images uploaded!`,
                result: result,
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.deleteFiles = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const fileUrls = req.body?.fileUrls;

    try {
        await new Promise((resolve, reject) => {
            fileUrls.forEach( async (url, index, array) => {
                const filePath = getPathStorageFromUrl(url);

                const rootPath = `users/`;
                const userId = getUserIdFromFilePath(filePath, rootPath);
        
                if (userId !== req.profile._id.toString())
                    return res.status(400).json({
                        status: 400,
                        message: `Cannot delete other user's files.`
                    })
        
                deleteFile(filePath).then((result, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    if (index === array.length - 1)
                        resolve();
                });
            })
        }).then(() => {
            return res.status(200).json({
                status: 200,
                message: `Deleted successfully.`
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.uploadDocs = async (req, res) => {
    const documents = req?.files;
    const userId = req?.profile._id;

    if (!documents)
        return res.status(400).json({
            status: 400,
            message: `Insert documents to upload.`,
        })

    try {
        let result = [];

        const uploadDocs = await new Promise((resolve, reject) => {
            documents.forEach((document, index, array) => {
                let ref = `users/${userId}/documents/${document.originalname}`;
                upload(document, ref).then((data, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    result.push(data);
                    if (index === array.length - 1)
                        resolve();
                });
            });

        }).then(() => {

            return res.status(200).json({
                status: 200,
                message: `Documents uploaded!`,
                result: result,
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.getUserById = (req, res, next, id) => {
    try {
        User.findById(mongoose.Types.ObjectId(id)).exec((error, user) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!user)
                return res.status(400).json({
                    status: 400,
                    message: "User not found."
                })
            else {
                req.profile = user._doc;
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

exports.getUser = (req, res) => {
    const { password, ...userInfo } = req.profile;
    return res.status(200).json({
        status: 200,
        result: userInfo
    })
}

exports.updateUser = async (req, res) => {
    const checkUser = await User.findOne({ username: req.body.username })

    if (req.body.username) {
        if (req.body.username.length < 5)
            return res.status(400).json({
                status: 400,
                message: "Username must be at least 5 chars long."
            })

        if (checkUser && checkUser.username && checkUser.username !== req.profile.username)
            return res.status(400).json({
                status: 400,
                message: "Username already exists."
            })
    }

    if (req.body.password) {
        if (req.body.password.length < 5)
            return res.status(400).json({
                status: 400,
                message: "Password must be at least 5 chars long."
            })
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSPHRASE
        ).toString();
    }

    if (req.body.isAdmin || req.body.isVerified || req.body.isSeller || req.body.isTech || req.body.isDeactivated) {
        if (!req.user.isAdmin)
            return res.status(401).json({
                status: 401,
                message: "Access Denied."
            })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.profile._id,
            {
                $set: req.body,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: "User updated!",
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const id = mongoose.Types.ObjectId(req.body.id.trim());
        const checkUser = await User.findById(id);
        if (!checkUser)
            return res.status(400).json({
                status: 200,
                message: `User not found.`,
            });

        await User.findByIdAndDelete(id);
        await UserDetails.findOneAndDelete({ _userId: id });
        await Seller.findOneAndDelete({ _userId: id });
        await SellerDetails.findOneAndDelete({ _userId: id });
        await Technician.findOneAndDelete({ _userId: id });
        await TechnicianDetails.findOneAndDelete({ _userId: id });

        return res.status(200).json({
            status: 200,
            message: `User ${id} has been successfully deleted.`,
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });
        return res.status(500).json(error);
    }
}

exports.getAllUsers = async (req, res) => {
    let { query, page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: limit
    };

    try {
        const users = await User.paginate(query, options)

        return res.status(200).json({
            status: 200,
            result: users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.getUserStatistics = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]).catch((err) => console.log(err));

        return res.status(200).json({
            status: 200,
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

