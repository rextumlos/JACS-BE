const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error)
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
            req.user = user;
            next();
        }
    })
}

exports.getUser = (req, res) => {
    const { password, ...userInfo } = req.user;
    return res.status(200).json({
        status: 200,
        result: userInfo
    })
}

exports.updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSPHRASE
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
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
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: `User ${req.params.id} has been successfully deleted.`,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getAllUsers = async (req, res) => {
    let { page, limit } = req.query;
    page > 1 ? page : page = 1;
    limit > 1 ? limit : limit = 10;

    try {
        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * 1)
            .exec();

        const count = await User.countDocuments();
        const result = [];

        for (let user of users) {
            const { password, ...userInfo } = user._doc;
            result.push(userInfo);
        }

        return res.status(200).json({
            status: 200,
            result,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
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

