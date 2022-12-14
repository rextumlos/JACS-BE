const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const UserDetails = require("../models/UserDetails");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");
const mongoose = require("mongoose");
const { BSONTypeError } = require("bson");

// Get all user details
exports.getAllUserDetails = async (req, res) => {
    let { query, page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: limit
    };

    try {
        const users = await UserDetails.paginate(query, options);

        return res.status(200).json({
            status: 200,
            result: users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// Get a User Detail
exports.getUserDetail = async (req, res) => {
    const { _id } = req.profile;
    const id = _id.toString();

    try {
        const userDetail = await UserDetails.findOne({ _userId: id });
        if (!userDetail) {
            return res.status(400).json({
                status: 400,
                message: "User detail not found."
            })
        }

        return res.status(200).json({
            status: 200,
            message: "User detail found!",
            result: userDetail
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error
        })
    }

}

// Add User Detail
exports.addUserDetail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _userId, ...body } = req.body;
    const id = mongoose.Types.ObjectId(_userId.trim());

    const checkIfDetailExists = await UserDetails.findOne({ _userId: id });
    if (checkIfDetailExists)
        return res.status(400).json({
            status: 400,
            message: `A user detail already exists.`
        })

    const checkIfEmailExists = await UserDetails.findOne({ email: req.body.email });
    if (checkIfEmailExists)
        return res.status(400).json({
            status: 400,
            message: `Email already used.`
        })

    try {
        const newUserDetail = new UserDetails({
            _userId: id,
            ...body
        })

        newUserDetail.save(async error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    message: error,
                })
            }

            EmailToken.findOneAndUpdate(
                { _userId: _userId },
                {
                    token: crypto.randomBytes(16).toString("hex"),
                    expires: "15m",
                },
                { upsert: true, new: true, setDefaultsOnInsert: true },
                (error, data) => {
                    if (error) {
                        return res.status(400).json({
                            status: 400,
                            message: error,
                        })
                    }
                    const title = "Email confirmation";
                    const body = `Please click the link below to confirm your email. <br>
                        <a href=${process.env.URI}/api/verify/${data._userId}/${data.token}>Verify your email</a><br>
                        Please note that if you change your email in future, you will need to verify it again.<br><br>
                        Thank you for creating your account!`;

                    sendEmail(newUserDetail.email, title, body);
                }
            )

            res.status(201).json({
                status: 201,
                message: `User detail added for User ${id}! We sent a mail on your email to verify your account. Please verify it.`
            })
        })

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });
        else
            res.status(500).json({
                status: 500,
                message: error
            })
    }

}

// Update User Detail
exports.updateUserDetail = async (req, res) => {
    const { _id } = req.profile;
    const id = _id.toString();

    if (req.body.email !== undefined) {
        let regexp = /\S+@\S+\.\S+/;
        regexp.test(req.body.email !== undefined)
        if (!regexp)
            return res.status(400).json({
                status: 400,
                message: `Must be an email.`
            })

        const checkIfEmailExists = await UserDetails.findOne({ email: req.body.email });
        if (checkIfEmailExists)
            return res.status(400).json({
                status: 400,
                message: `Email already used.`
            })
    }

    try {
        const updatedUserDetail = await UserDetails.findOneAndUpdate(
            { _userId: id },
            {
                $set: req.body,
            },
            { new: true }
        );

        if (req.body.email !== undefined) {
            const account = await User.findByIdAndUpdate(
                updatedUserDetail._userId,
                {
                    isVerified: false,
                },
                { new: true }
            )

            EmailToken.findOneAndUpdate(
                { _userId: updatedUserDetail._userId },
                {
                    token: crypto.randomBytes(16).toString("hex"),
                    expires: "15m",
                },
                { upsert: true, new: true, setDefaultsOnInsert: true },
                (error, data) => {

                    if (error) {
                        return res.status(400).json({
                            status: 400,
                            message: error,
                        })
                    }

                    const title = "Updated Email Verification";
                    const body = `Hello ${account.username}! <br><br>
                                    We noticed that you have changed your email. <br><br>
                                    Please click the link below to re-confirm your seller email. <br>
                                    <a href=${process.env.URI}/api/verify/${data._userId}/${data.token}>Re-verify my email!</a><br>
                                    Please note that if you change your email in future, you will need to verify it again.<br><br>
                                    Thank you and have a good day!<br><br>
                                    <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                    sendEmail(updatedUserDetail.email, title, body);

                    return res.status(200).json({
                        status: 200,
                        message: "User detail updated! Please re-confirm your email.",
                    });
                }
            )
        } else
            return res.status(200).json({
                status: 200,
                message: "User detail updated!",
            });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

// Delete User Detail
exports.deleteUserDetail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const id = req.body.id.trim();

        await UserDetails.deleteOne({ _userId: mongoose.Types.ObjectId(id) })

        return res.status(200).json({
            status: 200,
            message: `User ${id} has been deleted successfully.`
        })

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });
        else
            return res.status(500).json({
                status: 500,
                message: error
            });
    }
}

// Resend Email Verification
exports.resendverification = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const email = req.body.email;
        const findUser = await UserDetails.findOne({ email: email });

        if (!findUser)
            return res.status(400).json({
                status: 400,
                message: "Sorry, there is no user using the email you have input."
            })

        EmailToken.findOneAndUpdate(
            { _userId: findUser._userId },
            {
                token: crypto.randomBytes(16).toString("hex"),
                expires: "15m",
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
            (error, data) => {
                if (error) {
                    return res.status(400).json({
                        status: 400,
                        message: error,
                    })
                }

                const title = "Email confirmation";
                const body = `Please click the link below to confirm your email. <br>
                            <a href=${process.env.URI}/api/verify/${data._userId}/${data.token}>Verify your email</a><br>
                            Thank you for creating your account!`;

                sendEmail(findUser.email, title, body);

                return res.status(200).json({
                    status: 200,
                    message: `Email verification resent.`
                });
            }
        )

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}
