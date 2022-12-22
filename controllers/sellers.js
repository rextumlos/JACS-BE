const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const Seller = require("../models/Seller");
const { sendEmail } = require("../utils/sendEmail");
const { validationResult } = require("express-validator");
const SellerDetails = require("../models/SellerDetails");
const mongoose = require("mongoose");
const { BSONTypeError } = require("bson");

exports.getSellerByUserId = (req, res, next, id) => {
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
                req.seller = user._doc;
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
    const user = req.seller;
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

    const { _userId, typeOfSeller, documents } = req.body

    try {
        const id = mongoose.Types.ObjectId(_userId.trim())

        if (documents === undefined)
            return res.status(400).json({
                status: 400,
                message: `Documents are required.`
            });


        const user = await UserDetails.findOne({ _userId: id });
        if (!user)
            return res.status(400).json({
                status: 400,
                message: `User not found.`
            });

        const checkSeller = await Seller.findOne({ _userId: id });
        if (checkSeller)
            return res.status(400).json({
                status: 400,
                message: `Seller required documents are already exists.`
            });

        const newSeller = new Seller({
            _userId: id,
            typeOfSeller: typeOfSeller.toUpperCase(),
            documents: documents
        })

        await newSeller.save()

        const title = "Seller Registration";
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                        We have received your seller application to verify your account to be a seller. <br><br>
                        We will send you an email to notice you if your documents are valid so please wait for it. <br><br>
                        Thank you! <br><br>
                        <strong>Just Another Computer Shop. JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Seller registration has been created for user ${user._userId}.`
        });

    } catch (error) {
        if (error.name === "ValidationError" && error.errors.typeOfSeller)
            return res.status(400).json({
                status: 400,
                message: error.errors.typeOfSeller.message
            })

        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });

        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.updateSellerById = async (req, res) => {
    const user = req.seller;

    const checkSeller = await Seller.findOne({ _userId: user._userId });
    if (!checkSeller)
        return res.status(400).json({
            status: 400,
            message: `Seller does not exist.`
        });

    if (req.body.isApproved !== undefined) {
        if (!req.user.isAdmin)
            return res.status(401).json({
                status: 401,
                message: `Access denied.`
            });
    }

    if (req.body.typeOfSeller !== undefined) {
        if (checkSeller.typeOfSeller !== req.body.typeOfSeller)
            if (req.body.documents === undefined)
                return res.status(400).json({
                    status: 400,
                    message: `Documents are required when changing seller type.`
                });
    }

    if (req.body.documents !== undefined) {
        const docs = req.body.documents;
        if (docs.length < 1)
            return res.status(400).json({
                status: 400,
                message: `Documents cannot be empty.`
            });

        for (let i = 0; i < docs.length; i++) {
            if (docs[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `Documents must not contain empty strings.`
                });
        }
    }

    try {
        const { typeOfSeller, ...data } = req.body;

        await Seller.findOneAndUpdate(
            { _userId: user._userId },
            {
                typeOfSeller: typeOfSeller.toUpperCase(),
                ...data,
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
            message: `Seller documents has been updated for user ${user._userId}.`
        });

    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError" && error.errors.typeOfSeller)
            return res.status(400).json({
                status: 400,
                message: error.errors.typeOfSeller.message
            })
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

exports.deleteSellerById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const id = mongoose.Types.ObjectId(req.body._userId.trim());

        const checkSeller = await Seller.findOne({ _userId: id });
        if (!checkSeller)
            return res.status(400).json({
                status: 400,
                message: `Seller does not exists.`
            });

        await Seller.findOneAndDelete({ _userId: id });
        const seller = await SellerDetails.findOneAndDelete({ _userId: id }) || "No name store";
        await User.findByIdAndUpdate(
            id,
            { isSeller: false },
            { new: true }
        )

        const user = await UserDetails.findOne({ _userId: id });
        const title = "Deletion of Seller Account";
        let body;

        if (req.user.isAdmin)
            body = `Hello ${user.firstName} ${user.lastName}.<br><br>
                        We have deleted your seller account: ${seller.storeName}.<br>
                        Thank you for your service and for using JACS!<br><br>
                        Keep safe always!<br><br>
                        <strong>Just Another Computer Shop, JACS. 2022</strong>`;

        body = `Hello ${user.firstName} ${user.lastName}!<br><br>
                    You have successfully deleted your seller account: ${seller.storeName}.<br>
                    Thank you for your service and for using JACS!<br><br>
                    Keep safe always!<br><br>
                    <strong>Just Another Computer Shop, JACS. 2022</strong>`;

        sendEmail(user.email, title, body);

        return res.status(200).json({
            status: 200,
            message: `Seller ${id} successfully deleted.`
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

exports.confirmSeller = async (req, res) => {
    const user = req.seller;

    try {
        const account = await User.findById(user._userId);

        await User.findByIdAndUpdate(account._id, { isSeller: true }, { new: true });
        await Seller.findOneAndUpdate({ _userId: account._id }, { isApproved: 'APPROVED' }, { new: true })

        const title = "Seller approved."
        const body = `Hello ${user.firstName} ${user.lastName}! <br><br>
                    Your seller application is now approved! You may now create your seller details by clicking the link below. <br><br>
                    <a href="${process.env.URI}/api/sellers/${user._userId}/details">Click me to create your seller details!</a><br><br>
                    <strong>If you already have details, please disregard the link.</strong> <br><br>
                    We expect you to follow our rules and regulations. Thank you!<br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        return res.status(200).json({
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
    const user = req.seller;

    try {
        const account = await User.findById(user._userId);

        await Seller.findOneAndUpdate({ _userId: account._id }, { isApproved: 'REJECTED' }, { new: true });

        const title = "Seller rejected."
        const body = `Hello ${user.firstName} ${user.lastName}. <br><br>
                    We are sorry to inform you that your documents you have sent does not meet the requirements for applying as seller.<br><br>
                    Please update your documents for us to approve your application. <br><br>
                    Thank you! <br><br>
                    <strong>Just Another Computer Shop. JACS. 2022</strong>`

        sendEmail(user.email, title, body);

        return res.status(200).json({
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
