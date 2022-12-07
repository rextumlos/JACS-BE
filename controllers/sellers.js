const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const Seller = require("../models/Seller");
const { validationResult } = require("express-validator");

const nodemailer = require("nodemailer");

exports.getSellerByUserId = (req, res, next, id) => {
    UserDetails.findOne({ userId: id }).exec((error, user) => {
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
}

exports.getAllSellers = async (req, res) => {
    let { query, page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: limit
    };

    try {
        const sellers = await Seller.paginate(query, options)

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
}

exports.getSellerById = async (req, res) => {
    const user = req.profile;
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

    try {
        const seller = await Seller.findOne({ _userId: user._userId })

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

exports.addSellerById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const user = req.profile;

    const checkSeller = await Seller.findOne({ _userId: user._userId });
    if (checkSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller required documents are already exists.`
        });

    try {
        const { typeOfSeller, governId, proofOfBankAcc } = req.body;

        const newSeller = new Seller({
            _userId: user._userId,
            typeOfSeller: typeOfSeller.toUpperCase(),
            governId: governId,
            proofOfBankAcc: proofOfBankAcc
        })

        await newSeller.save()

        const title = "Seller Registration";
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        We have received your seller application to verify your account to be a seller. <br><br>
                        We will send you an email to notice you if your documents are valid so please wait for it. <br><br>
                        Thank you! <br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

        await sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Seller registration has been created for user ${user._id}.`
        });

    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError" && error.errors.typeOfSeller)
            return res.status(400).json({
                status: 400,
                message: error.errors.typeOfSeller.message
            })

        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.updateSellerById = async (req, res) => {
    const user = req.profile;

    const checkSeller = await Seller.findOne({ _userId: user._userId });
    if (!checkSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller does not exist.`
        });

    try {
        const { typeOfSeller, governId, proofOfBankAcc } = req.body;

        await Seller.findOneAndUpdate(
            { _userId: user._userId },
            {
                typeOfSeller: typeOfSeller.toUpperCase(),
                governId: governId,
                proofOfBankAcc: proofOfBankAcc,
                isApproved: 'UPDATED'
            },
            { new: true, runValidators: true }
        );

        const title = "Updating Seller Documents";
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        We noticed that you updated your seller documents. We are going to verify your updated documents to continue your service. <br><br>
                        We will send you an email to notice you if your documents are valid so please wait for it. <br><br>
                        Thank you! <br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Seller documents has been updated for user ${user._id}.`
        });

    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError" && error.errors.typeOfSeller)
            return res.status(400).json({
                status: 400,
                message: error.errors.typeOfSeller.message
            })
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.deleteSellerById = async (req, res) => {
    const user = req.profile;

    const checkSeller = await Seller.findOne({ _userId: user._userId });
    if (!checkSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller does not exists.`
        });

    try {
        await Seller.findOneAndDelete({ _userId: user._userId });
        return res.status(200).json({
            status: 200,
            message: `Seller successfully deleted.`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.confirmSeller = async (req, res) => {
    const user = req.profile;

    try {
        const account = await User.findById(user._userId);

        await User.findByIdAndUpdate(account._id, { isSeller: true }, { new: true });
        await Seller.findOneAndUpdate({ _userId: account._id }, { isApproved: 'APPROVED' }, { new: true })

        const title = "Seller approved."
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                    Your seller application is now approved! You may now create your seller details by clicking the link below. <br><br>
                    <a href="${process.env.URI}/api/sellers/${user._userId}/details">Click me to create your seller details!</a><br><br>
                    We expect you to follow our rules and regulations. Thank you!<br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        res.status(200).json({
            status: 200,
            message: `User ${account._id} is now a verified seller!`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.rejectSeller = async (req, res) => {
    const user = req.profile;

    try {
        const account = await User.findById(user._userId);

        await Seller.findOneAndUpdate({ _userId: account._id }, { isApproved: 'REJECTED' }, { new: true });

        const title = "Seller rejected."
        const body = `Hello ${user.firstName} ${user.lastName}. <br><br>
                    We are sorry to inform you that your documents you have sent does not meet the requirements for applying as seller.<br><br>
                    Please submit another documents for us to approve your application. <br><br>
                    Thank you! <br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        res.status(200).json({
            status: 200,
            message: `User ${account._id}'s seller application is rejected!`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

const sendEmail = (receiver, title, body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: receiver,
        subject: title,
        html: body
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent.");
        }
    })
}