const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const EmailToken = require("../models/EmailToken");

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: errors.array()[0].msg
    })
  }

  if (req.body.isAdmin || req.body.isVerified || req.body.isSeller || req.body.isTech || req.body.isDeactivated) {
    return res.status(401).json({
      status: 401,
      message: "Access Denied."
    })
  }

  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSPHRASE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json({
      status: 201,
      message: `Created user. User ID: ${savedUser._id}`,
    });
  } catch (error) {
    console.log(error);
    if (
      error.name === "MongoServerError" &&
      error.code === 11000 &&
      error.keyValue.hasOwnProperty("email")
    ) {
      return res.status(400).json({
        status: 400,
        message: `Email is already used.`,
      });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(400).json({
        status: 400,
        message: `Username is already used.`,
      });
    } else if (error.name === "ValidationError") {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    } else return res.status(500).json(error);
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid username/password.",
      });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSPHRASE
    );
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== req.body.password) {
      return res.status(401).json({
        status: 401,
        message: "Invalid username/password.",
      });
    }

    // const userDetails = await UserDetails.findOne({ userId: user._id });
    // if (!user.isVerified) {
    //   if (userDetails)
    //     return res.status(200).json({
    //       status: 200,
    //       message: "Seems like you have email input in your account. Please verify your email.",
    //       result: userDetails._doc
    //     })

    //   return res.status(200).json({
    //     status: 200,
    //     message: "Please verify your account using your email.",
    //   });
    // }


    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

  const { _id, username, isAdmin, isVerified, ...hide } = user._doc;

    return res.status(200).json({
      status: 200,
      message: "Login successful!",
      result: {
        _id,
        username,
        isAdmin,
        isVerified,
        accessToken
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

exports.forgotpassword = async (req, res) => {
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
      { _userId: findUser.userId },
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

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS,
          }
        });

        const mailOptions = {
          from: process.env.GMAIL_EMAIL,
          to: findUser.email,
          subject: "Reset password confirmation.",
          html: `Please click the link below to reset your password. <br>
                            <a href=${process.env.URI}/api/resetpassword/${data._userId}/${data.token}>Change your password.</a>`
        };

        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            console.log(error);
          } else {
            return res.status(200).json({
              status: 200,
              message: "Reset password verification sent to your email."
            })
          }
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

exports.resetpassword = async (req, res) => {
  const { token } = req.params;
  const emailToken = req.emailToken;

  if (emailToken.token !== token)
    return res.status(403).json({
      status: 403,
      message: "Invalid link or expired."
    })

  if (req.body.password.length < 5)
    return res.status(400).json({
      status: 400,
      message: "Password must be at least 5 chars long."
    })

  try {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSPHRASE
    ).toString();

    const getUser = await User.findByIdAndUpdate(
      emailToken._userId
      , {
        password: req.body.password,
      },
      { new: true }
    );

    await EmailToken.findOneAndDelete({_userId: getUser._id});

    return res.status(200).json({
      status: 200,
      message: "Password successfully changed! Please login again.",
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error
    });
  }

}