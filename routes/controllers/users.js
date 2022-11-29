const User = require("../../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
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
      totalPages: Math.ceil(count),
      currentPage: Number(page),
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


// Get user statistics
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
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
});

// Update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
});

// Delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: `User ${req.params.id} has been successfully deleted.`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get user
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...userInfo } = user._doc;
    return res.status(200).json({
      status: 200,
      result: userInfo ,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
