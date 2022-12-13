const SellerDetails = require("../models/SellerDetails");
const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const { sendEmail } = require("../utils/sendEmail");
const { validationResult } = require("express-validator");
const UserDetails = require("../models/UserDetails");

const checkUser = async (user) => {
    const checkIfSeller = await User.findOne({ _id: user._userId })
    if (!checkIfSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller does not exists.`
        });

    if (!checkIfSeller.isSeller) {
        return res.status(400).json({
            status: 400,
            message: "User is not a seller."
        })
    }

}

exports.getAllSellerDetails = async (req, res) => {
    try {
        let { query, page = 1, limit = 10 } = req.query;

        const options = {
            page: page,
            limit: limit
        };

        try {
            const sellers = await SellerDetails.paginate(query, options)

            return res.status(200).json({
                status: 200,
                result: sellers
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.getSellerDetailsById = async (req, res) => {

    const user = req.profile;
    checkUser(user);

    try {
        const seller = await SellerDetails.findOne({ _userId: user._userId })

        if (!seller)
            return res.status(400).json({
                status: 400,
                message: "Seller not found."
            })

        return res.status(200).json({
            status: 200,
            result: seller
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.addSellerDetailsById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const user = req.profile;
    checkUser(user);

    const checkSeller = await SellerDetails.findOne({ _userId: user._userId });
    if (checkSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller details are already exists.`
        });

    try {
        const { storeName, contactNo, email } = req.body;

        const newSellerDetail = new SellerDetails({
            _userId: user._userId,
            storeName: storeName,
            contactNo: contactNo,
            email: email,
        });

        newSellerDetail.save().exec((errors) => {
            if (errors)
                return res.status(500).json({
                    status: 500,
                    message: errors
                })

            EmailToken.findOneAndUpdate(
                { _userId: user._userId },
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

                    const title = "Seller Email Verification";
                    const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        Please click the link below to confirm your seller email. <br>
                        <a href=${process.env.URI}/api/seller/verify/${data._userId}/${data.token}>Verify my seller email!</a><br>
                        Please note that all of your updates about your seller account will be sent on this email.<br><br>
                        Thank you and have a good day!<br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                    sendEmail(user.email, title, body);
                }
            )

            return res.status(200).json({
                status: 200,
                message: `Seller detail has been created for user ${user._id}.`
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.updateSellerDetailsById = async (req, res) => {
    const user = req.profile;
    checkUser(user);

    if (req.body.email) {
        let regexp = /\S+@\S+\.\S+/;
        regexp.test(req.body.email)
        if (!regexp)
            return res.status(400).json({
                status: 400,
                message: `Must be an email.`
            })

        const checkIfEmailExists = await SellerDetails.findOne({ email: req.body.email });
        if (checkIfEmailExists)
            return res.status(400).json({
                status: 400,
                message: `Email already used.`
            })
    }

    try {
        const updatedSellerDetail = await SellerDetails.findOneAndUpdate(
            { _userId: user._userId },
            {
                $set: req.body,
            },
            { new: true }
        );

        if (updatedSellerDetail.email) {
            const account = await SellerDetails.findByIdAndUpdate(
                updatedSellerDetail._userId,
                {
                    isEmailConfirmed: false,
                },
                { new: true }
            )

            EmailToken.findOneAndUpdate(
                { _userId: updatedSellerDetail._userId },
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

                    const title = "Updated seller email verification";
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
                        message: "Seller detail updated! Please re-confirm your email.",
                    });
                }
            )
        } else
            return res.status(200).json({
                status: 200,
                message: "Seller detail updated!",
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.deleteSellerDetailsById = async (req, res) => {
    const user = req.profile;
    checkUser(user);

    try {
        await SellerDetails.findOneAndDelete({ _userId: user._userId });
        return res.status(200).json({
            status: 200,
            message: `User ${user._userId} has been successfully deleted.`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.resendSellerEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const email = req.body.email;
        const findUser = await SellerDetails.findOne({ email: email });

        if (!findUser)
            return res.status(400).json({
                status: 400,
                message: "Sorry, there is no user using the email you have input."
            })

        const user = await UserDetails.findOne({ _userId: findUser._userId });

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

                const title = "Seller Email Verification";
                const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        Please click the link below to confirm your seller email. <br>
                        <a href=${process.env.URI}/api/verify/${data._userId}/${data.token}>Verify your seller email!</a><br>
                        Please note that all of your updates about your seller account will be sent on this email.<br><br>
                        Thank you and have a good day!<br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                sendEmail(findUser.email, title, body);

                res.status(200).json({
                    status: 200,
                    message: "Seller email verification resent."
                })
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}
