const Cart = require("../models/Cart");
const UserDetails = require("../models/UserDetails");
const Product = require("../models/Product");
const { BSONTypeError } = require("bson");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.getCartByUserId = async (req, res, next, id) => {
    try {
        Cart.findOne({_userId: mongoose.Types.ObjectId(id)}).exec((error, cart) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!cart)
                return res.status(400).json({
                    status: 400,
                    message: "Cart not found."
                })
            else {
                req.cart = cart._doc;
                next();
            }
        })

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of User."
            });
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.getCart = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            result: req.cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.addCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const products = req.body?.products;

    try {
        const id = mongoose.Types.ObjectId(req.body._userId);
        const user = await UserDetails.findOne({_userId: id});

        if (!user)
            return res.status(400).json({
                status: 400,
                message: `User not found.`
            });

        const checkCart = await Cart.findOne({_userId: id})
        if (checkCart)
            return res.status(400).json({
                status: 400,
                message: `Cart already created.`
            })

        for (let i = 0; i < products.length; i++) {
            if (products[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `products must not contain empty objects.`
                });

            const convertId = await mongoose.Types.ObjectId(products[i]._productId);

            const product = await Product.findById(convertId);
            if (!product)
                return res.status(400).json({
                    status: 400,
                    message: `Product id: ${products[i]._productId} not found.`
                });
        }

        const newCart = new Cart({
            _userId: id,
            products: products,
        });

        await newCart.save();
        return res.status(201).json({
            status: 201,
            message: `Added cart successfully!`,
            result: newCart,
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of Cart/Product."
            });

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.updateCart = async (req, res) => {
    const cart = req.cart;
    const products = req.body?.products;

    try {
        for (let i = 0; i < products.length; i++) {
            if (products[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `products must not contain empty objects.`
                });

            const convertId = await mongoose.Types.ObjectId(products[i]._productId)

            const product = await Product.findById(convertId);
            if (!product)
                return res.status(400).json({
                    status: 400,
                    message: `Product id: ${products[i]._productId} not found.`
                });
        };

        const updatedCart = await Cart.findByIdAndUpdate(
            cart._id,
            {
                $set: {
                    products: products
                }
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: `Cart updated!`,
            result: updatedCart
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of Product."
            });
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}
