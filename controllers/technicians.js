const Technician = require("../models/Technician");
const mongoose = require("mongoose");
const { BSONTypeError } = require("bson");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const { sendEmail } = require("../utils/sendEmail");

exports.getTechnicianByUserId = (req, res, next, id) => {
    try {
        UserDetails.findOne({ _userId: mongoose.Types.ObjectId(id) }).exec((error, user) => {
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
                req.technician = user._doc;
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

exports.getAllTechnicians = async (req, res) => {
    let { query, page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: limit
    };

    try {
        const techs = await Technician.paginate(query, options)

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
}

exports.getTechnicianById = async (req, res) => {
    const user = req.technician;
    const checkIfTech = await User.findOne({ _id: user._userId })

    if (!checkIfTech)
        return res.status(400).json({
            status: 400,
            message: `Technician does not exists.`
        });

    if (!checkIfTech.isTech) {
        return res.status(400).json({
            status: 400,
            message: "User is not a technician."
        })
    }

    try {
        const tech = await Technician.findOne({ _userId: user._userId })

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

exports.addTechnicianById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _userId, governId, certOfTrainings } = req.body

    if (governId === undefined)
        return res.status(400).json({
            status: 400,
            message: `Documents are required.`
        });

    for (let i = 0; i < governId.length; i++) {
        if (governId[i] === "")
            return res.status(400).json({
                status: 400,
                message: `governId must not contain empty strings.`
            });
    }

    if (certOfTrainings === undefined)
        return res.status(400).json({
            status: 400,
            message: `Documents are required.`
        });

    for (let i = 0; i < certOfTrainings.length; i++) {
        if (certOfTrainings[i] === "")
            return res.status(400).json({
                status: 400,
                message: `certOfTrainings must not contain empty strings.`
            });
    }

    try {
        const id = mongoose.Types.ObjectId(_userId.trim());

        const user = await UserDetails.findOne({ _userId: id });
        if (!user)
            return res.status(400).json({
                status: 400,
                message: `User not found.`
            });

        const checkTech = await Technician.findOne({ _userId: id });
        if (checkTech)
            return res.status(400).json({
                status: 400,
                message: `Technician required documents are already exists.`
            });

        const newTech = new Technician({
            _userId: id,
            governId: governId,
            certOfTrainings: certOfTrainings
        })

        await newTech.save()

        const title = "Technician Registration";
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                            We have received your technician application to verify your account to be a technician. <br><br>
                            We will send you an email if your documents are valid so please wait for it. <br><br>
                            Thank you! <br><br>
                            <strong>Just Another Computer Shop. JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Technician registration has been created for user ${user._id}.`
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });

        console.log(error);

        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.updateTechnicianById = async (req, res) => {
    const user = req.technician;

    const checkTech = await Technician.findOne({ _userId: user._userId });
    if (!checkTech)
        return res.status(400).json({
            status: 400,
            message: `Technician does not exist.`
        });

    if (req.body.isApproved !== undefined) {
        if (!req.user.isAdmin)
            return res.status(401).json({
                status: 401,
                message: `Access denied.`
            });
    }

    if (req.body.governId !== undefined) {
        const docs = req.body.governId;
        if (docs.length < 1)
            return res.status(400).json({
                status: 400,
                message: `governId cannot be empty.`
            });

        for (let i = 0; i < docs.length; i++) {
            if (docs[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `governId must not contain empty strings.`
                });
        }
    }

    if (req.body.certOfTrainings !== undefined) {
        const docs = req.body.certOfTrainings;
        if (docs.length < 1)
            return res.status(400).json({
                status: 400,
                message: `certOfTrainings cannot be empty.`
            });

        for (let i = 0; i < docs.length; i++) {
            if (docs[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `certOfTrainings must not contain empty strings.`
                });
        }
    }

    try {
        await Technician.findOneAndUpdate(
            { _userId: user._userId },
            {
                ...req.body,
                isApproved: 'UPDATED'
            },
            { new: true, runValidators: true }
        );

        const title = "Updating Technician Documents";
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        We noticed that you updated your technician documents. We are going to verify your updated documents to continue your service. <br><br>
                        We will send you an email to notice you if your documents are valid so please wait for it. <br><br>
                        Thank you! <br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Technician documents has been updated for user ${user._id}.`
        });

    } catch (error) {
        console.log(error);
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

exports.deleteTechnicianById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const id = mongoose.Types.ObjectId(req.body._userId.trim());

        const checkTech = await Technician.findOne({ _userId: id });
        if (!checkTech)
            return res.status(400).json({
                status: 400,
                message: `Technician does not exists.`
            });

        await Technician.findOneAndDelete({ _userId: id });
        await User.findByIdAndUpdate(
            id,
            { isTech: false },
            { new: true }
        )

        const user = await UserDetails.findOne({ _userId: id });
        const title = "Deletion of Technician Access";
        let body;

        if (req.user.isAdmin)
            body = `Hello ${user.firstName} ${user.lastName}.<br><br>
                            We have deleted your access for being a technician.<br>
                            Thank you for your service and for using JACS!<br><br>
                            Keep safe always!<br><br>
                            <strong>Just Another Computer Shop, JACS. 2022</strong>`;

        body = `Hello ${user.firstName} ${user.lastName}!<br><br>
                        You are now not verified as Technician.<br>
                        Thank you for your service and for using JACS!<br><br>
                        Keep safe always!<br><br>
                        <strong>Just Another Computer Shop, JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Technician ${id} successfully deleted.`
        })

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.confirmTech = async (req, res) => {
    const user = req.technician;

    try {
        const account = await User.findById(user._userId);
        if (account.isTech)
            return res.status(400).json({
                status: 400,
                message: `User ${account._id} is already a technician!`
            })

        await User.findByIdAndUpdate(account._id, { isTech: true }, { new: true });
        await Technician.findOneAndUpdate({ _userId: account._id }, { isApproved: 'APPROVED' }, { new: true })

        const title = "Technician registration approved."
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                    Your technician application is now approved! You may now create your technician information by clicking the link below. <br><br>
                    <a href="${process.env.URI}/api/technicians/${user._userId}/details">Click me to create your technician information!</a><br><br>
                    We expect you to follow our rules and regulations. Thank you!<br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `User ${account._id} is now a verified technician!`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.rejectTech = async (req, res) => {
    const user = req.technician;

    try {
        const account = await User.findById(user._userId);

        await Technician.findOneAndUpdate({ _userId: account._id }, { isApproved: 'REJECTED' }, { new: true });
        await User.findByIdAndUpdate(account._id, { isTech: false }, { new: true });

        const title = "Technician registration rejected."
        const body = `Hello ${user.firstName} ${user.lastName}. <br><br>
                    We are sorry to inform you that your documents you have sent does not meet the requirements for applying as technician.<br><br>
                    Please submit another documents for us to approve your application. <br><br>
                    Thank you! <br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `User ${account._id}'s technician application is rejected!`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}