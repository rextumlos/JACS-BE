const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const { validationResult } = require("express-validator");

exports.getUserTokenByUserId = async (req, res, next, id) => {
    EmailToken.findOne({_userId: id}).exec((error, user) => {
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

    if (emailToken.token !== token) 
        return res.status(403).json({
            status: 403,
            message:"Invalid token."
        })

    const verifyUser = await User.findByIdAndUpdate(
        emailToken._userId.toString(),
        {
            isVerified : true,
        },
        { new: true }
    )

    return res.status(200).json({
        status: 200,
        message:`User "${verifyUser.username}" has been verified successfully.`,
    })
}
