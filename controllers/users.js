const User = require("../models/User");
const CryptoJS = require("crypto-js");
const UserDetails = require("../models/UserDetails");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
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

        if (checkUser.username !== req.profile.username)
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
    const { _id } = req.profile;
    const id = _id.toString();

    try {
        await User.findByIdAndDelete(id);
        await UserDetails.findOneAndDelete({userId: id});
        return res.status(200).json({
            status: 200,
            message: `User ${id} has been successfully deleted.`,
        });
    } catch (error) {
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

