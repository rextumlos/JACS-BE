const TechDetails = require("../models/TechnicianDetails");
const User = require("../models/User");
const EmailToken = require("../models/EmailToken");
const { sendEmail } = require("../utils/sendEmail");
const { validationResult } = require("express-validator");
const UserDetails = require("../models/UserDetails");
const mongoose = require("mongoose");
const crypto = require("crypto");

exports.getAllTechDetails = async (req, res) => {
    try {
        let { query, page = 1, limit = 10 } = req.query;

        const options = {
            page: page,
            limit: limit
        };

        try {
            const techs = await TechDetails.paginate(query, options)

            return res.status(200).json({
                status: 200,
                result: techs
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

exports.getTechDetailsById = async (req, res) => {
    const user = req.technician;

    try {
        const tech = await TechDetails.findOne({ _userId: user._userId })

        if (!tech)
            return res.status(400).json({
                status: 400,
                message: "Technician not found."
            })

        return res.status(200).json({
            status: 200,
            result: tech
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.addTechDetailsById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _userId, ...body } = req.body;
    const id = mongoose.Types.ObjectId(_userId.trim());

    const checkTech = await TechDetails.findOne({ _userId: id });
    if (checkTech)
        return res.status(400).json({
            status: 400,
            message: `Technician details are already exists.`
        });

    const checkIfEmailExists = await TechDetails.findOne({ email: req.body.email });
    if (checkIfEmailExists)
        return res.status(400).json({
            status: 400,
            message: `Email already used.`
        })

    if (req.body.isEmailConfirmed) {
        if (!req.user.isAdmin)
            return res.status(401).json({
                status: 400,
                message: `Access denied.`
            });
    }

    if (req.body.workSetup === "PHYSICAL") {
        if (req.body.address === undefined)
            return res.status(400).json({
                status: 400,
                message: `address is required if workSetup is "PHYSICAL".`
            });
    }

    try {
        const user = await UserDetails.findOne({ _userId: id });

        const newTechDetail = new TechDetails({
            _userId: id,
            ...body,
        });

        await newTechDetail.save()

        EmailToken.findOneAndUpdate(
            { _userId: id },
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

                const title = "Technician Email Verification";
                const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        Please click the link below to confirm your technician email. <br>
                        <a href=${process.env.URI}/api/technicians/verify/${data._userId.toString()}/${data.token}>Verify my technician email!</a><br>
                        Please note that all of your updates about your technician account will be sent on this email.<br><br>
                        Thank you and have a good day!<br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                sendEmail(newTechDetail.email, title, body);
            }
        )

        return res.status(200).json({
            status: 200,
            message: `Technician detail has been created for user ${newTechDetail._userId}.`
        });


    } catch (error) {
        if (error.name === "ValidationError" && error.errors.areaOfExpertise)
            return res.status(400).json({
                status: 400,
                message: error.errors.areaOfExpertise.message
            })

        if (error.name === "ValidationError" && error.errors.levelOfExpertise)
            return res.status(400).json({
                status: 400,
                message: error.errors.levelOfExpertise.message
            })

        if (error.name === "ValidationError" && error.errors.workSetup)
            return res.status(400).json({
                status: 400,
                message: error.errors.workSetup.message
            })

        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.updateTechDetailsById = async (req, res) => {
    const user = req.technician;

    if (req.body.isEmailConfirmed) {
        if (!req.user.isAdmin)
            return res.status(401).json({
                status: 400,
                message: `Access denied.`
            });
    }

    if (req.body.description !== undefined) {
        const desc = req.body.description
        if (desc.length < 1)
            return res.status(400).json({
                status: 400,
                message: "description must have at least 1 char."
            })
    }

    if (req.body.address !== undefined) {
        const address = req.body.address
        if (address.length < 1)
            return res.status(400).json({
                status: 400,
                message: "address must have at least 1 char."
            })
    }

    if (req.body.email !== undefined) {
        let regexp = /\S+@\S+\.\S+/;
        regexp.test(req.body.email)
        if (!regexp)
            return res.status(400).json({
                status: 400,
                message: `Must be an email.`
            })

        const checkIfEmailExists = await TechDetails.findOne({ email: req.body.email });
        if (checkIfEmailExists)
            return res.status(400).json({
                status: 400,
                message: `Email already used.`
            })
    }

    try {
        const checkTechDetail = await TechDetails.findOne({ _userId: user._userId });
        if (req.body.workSetup !== undefined) {
            if (checkTechDetail.workSetup !== req.body.workSetup && req.body.workSetup === "PHYSICAL") {
                if (req.body.address === undefined)
                    return res.status(400).json({
                        status: 400,
                        message: `address is required when changing workSetup into "PHYSICAL".`
                    })
            }
        }

        const updatedTechDetail = await TechDetails.findOneAndUpdate(
            { _userId: user._userId },
            {
                $set: req.body,
            },
            { new: true, runValidators: true }
        );

        if (req.body.email !== undefined) {
            const account = await TechDetails.findOneAndUpdate(
                { _userId: updatedTechDetail._userId },
                {
                    isEmailConfirmed: false,
                },
                { new: true }
            )

            EmailToken.findOneAndUpdate(
                { _userId: updatedTechDetail._userId },
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

                    const title = "Updated Technician email verification";
                    const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                                    We noticed that you have changed your email. <br><br>
                                    Please click the link below to re-confirm your technician email. <br>
                                    <a href=${process.env.URI}/api/technicians/verify/${data._userId.toString()}/${data.token}>Re-verify my email!</a><br>
                                    Please note that if you change your email in future, you will need to verify it again.<br><br>
                                    Thank you and have a good day!<br><br>
                                    <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                    sendEmail(updatedTechDetail.email, title, body);

                    return res.status(200).json({
                        status: 200,
                        message: "Technician detail updated! Please re-confirm your email.",
                    });
                }
            )
        } else
            return res.status(200).json({
                status: 200,
                message: "Technician detail updated!",
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }

}

exports.deleteTechDetailsById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const id = req.body.id;
        const tech = await TechDetails.findOne({ _userId: id })
        if (!tech)
            return res.status(400).json({
                status: 400,
                message: `Technician does not exists.`,
            });

        await TechDetails.findOneAndDelete({ _userId: mongoose.Types.ObjectId(id) });
        return res.status(200).json({
            status: 200,
            message: `User ${id}'s technician account has been successfully deleted.`,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.resendTechEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const email = req.body.email;
        const findUser = await TechDetails.findOne({ email: email });
        const user = await UserDetails.findOne({ _userId: findUser._userId });

        if (!findUser)
            return res.status(400).json({
                status: 400,
                message: "Sorry, there is no technician using the email you have input."
            })

        if (findUser.isEmailConfirmed)
            return res.status(400).json({
                status: 400,
                message: "Your email is already verified."
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

                const title = "Technician Email Verification";
                const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        Please click the link below to confirm your technician email. <br>
                        <a href=${process.env.URI}/api/technicians/verify/${data._userId}/${data.token}>Verify your seller email!</a><br>
                        Please note that all of your updates about your technician account will be sent on this email.<br><br>
                        Thank you and have a good day!<br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

                sendEmail(findUser.email, title, body);

                return res.status(200).json({
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