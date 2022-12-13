const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const SellerDetails = require("../models/SellerDetails");
const { validationResult } = require("express-validator");

exports.getUserTokenByUserId = async (req, res, next, id) => {
    EmailToken.findOne({ _userId: id }).exec((error, user) => {
        if (error)
            return res.status(400).json({
                status: 400,
                message: error
            })
        else if (!user)
            return res.status(400).json({
                status: 400,
                message: "Invalid link or expired."
            })
        else {
            req.emailToken = user._doc;
            next();
        }
    })
}

exports.verifyEmailToken = async (req, res) => {
    const { token } = req.params;
    const emailToken = req.emailToken;

    checkToken(emailToken.token, token);

    try {
        const checkUser = await User.findById(emailToken._userId)
        if (!checkUser)
            return res.status(400).json({
                status: 200,
                message: `User not found.`,
            })
        if (checkUser.isVerified)
            return res.status(400).json({
                status: 200,
                message: `User "${checkUser.username}" is already verified.`,
            })

        const verifyUser = await User.findByIdAndUpdate(
            emailToken._userId.toString(),
            {
                isVerified: true,
            },
            { new: true }
        )

        return res.status(200).json({
            status: 200,
            message: `User "${verifyUser.username}" has been verified successfully.`,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.verifySellerToken = async (req, res) => {
    const { token } = req.params;
    const emailToken = req.emailToken;

    checkToken(emailToken.token, token);

    try {
        const verifyUser = await SellerDetails.findByIdAndUpdate(
            emailToken._userId.toString(),
            {
                isEmailConfirmed: true,
            },
            { new: true }
        )

        return res.status(200).json({
            status: 200,
            message: `Seller email of "${verifyUser.username}" has been verified successfully.`,
            result: verifyUser,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

// exports.verifyTechinicianToken = async (req, res) => {
//     const { token } = req.params;
//     const emailToken = req.emailToken;

//     checkToken(emailToken.token, token);

//     const verifyUser = await User.findByIdAndUpdate(
//         emailToken._userId.toString(),
//         {
//             isTech: true,
//         },
//         { new: true }
//     )
//     return res.status(200).json({
//         status: 200,
//         message: `User "${verifyUser.username}" has been verified as TECHNICIAN successfully.`,
//     })
// }

const checkToken = (check, token) => {
    if (check !== token)
        return res.status(403).json({
            status: 403,
            message: "Invalid link or expired."
        })
}