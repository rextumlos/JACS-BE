const User = require("../models/User");

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
                message: `Email already exists.`,
            });
        } else if (error.name === "MongoServerError" && error.code === 11000) {
            return res.status(400).json({
                status: 400,
                message: `Username already exists.`,
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
    
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
    
        const { _id, username, isAdmin, ...hide } = user._doc;
    
        return res.status(200).json({
          status: 200,
          message: "Login successful!",
          result: {
            _id,
            username,
            isAdmin,
            accessToken
          }
        });
      } catch (error) {
        return res.status(500).json(error);
      }
}