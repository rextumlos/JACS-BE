const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const UserDetails = require("../models/UserDetails");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

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

exports.getUserDetail = async (req, res) => {
    const { _id } = req.profile;
    const id = _id.toString();

    try {
        const userDetail = await UserDetails.findOne({ userId: id });
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

exports.addUserDetail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _id } = req.profile;
    const id = _id.toString();

    const checkIfDetailExists = await UserDetails.findOne({ userId: id });
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
        const userId = id;
        const newUserDetail = new UserDetails({
            userId,
            ...req.body
        })

        await newUserDetail.save(async error => {
            // Email Verification
            if (error) {
                return res.status(400).json({
                    status: 400,
                    message: error,
                })
            }

            const emailToken = new EmailToken({
                _userId: userId,
                token: crypto.randomBytes(16).toString("hex"),
            });

            await emailToken.save(error => {
                if (error) {
                    return res.status(400).json({
                        status: 400,
                        message: error,
                    })
                }

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.GMAIL_EMAIL,
                        pass: process.env.GMAIL_PASS,
                    }
                });

                const mailOptions = {
                    from: process.env.GMAIL_EMAIL,
                    to: newUserDetail.email,
                    subject: "Email confirmation",
                    html: `Please click the link below to confirm your email. <br>
                        <a href=http://${req.headers.host}/api/verify/${emailToken._userId}/${emailToken.token}>Verify your email</a><br>
                        Thank you for creating your account!`
                };
                
                transporter.sendMail(mailOptions, (error, response) => {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log("Email verification sent.");
                    }
                })

            })
        })

        res.status(201).json({
            status: 201,
            message: `User detail added for User ${id}!`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error
        })
    }

}

exports.updateUserDetail = async (req, res) => {
    const { _id } = req.profile;
    const id = _id.toString();

    if (req.body.email) {
        let regexp = /\S+@\S+\.\S+/;
        regexp.test(req.body.email)
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
            { userId: id },
            {
                $set: req.body,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: "User detail updated!",
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteUserDetail = async (req, res) => {
    const { _id } = req.profile;
    const id = _id.toString();

    try {
        await UserDetails.findOneAndDelete({ userId: id });
        return res.status(200).json({
            status: 200,
            message: `User ${id} has been successfully deleted.`,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

