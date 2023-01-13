const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { BSONTypeError } = require("bson");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.getOrderById = async (req, res, next, id) => {
    try {
        Order.findById(mongoose.Types.ObjectId(id)).exec((error, order) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!order)
                return res.status(400).json({
                    status: 400,
                    message: "Order not found."
                })
            else {
                req.order = order._doc;
                next();
            }
        })
    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of Order."
            });
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.getOrderOfUser = async (req, res) => {
    const id = req.params.userId;
    let { query, page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: limit
    };

    const mainQuery = {
        _userId: id,
        query
    };

    try {
        const orders = await Order.paginate(mainQuery, options)

        return res.status(200).json({
            status: 200,
            message: `Order/s of user: ${id} is/are successfully retrieved.`,
            result: orders
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.getOrder = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            result: req.order
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}

exports.addOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const products = req.body?.products;
    const { amount, address, details } = req.body;

    try {
        const id = mongoose.Types.ObjectId(req.body._userId);
        const user = await User.findById(id);

        if (!user)
            return res.status(400).json({
                status: 400,
                message: `User not found.`
            });

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

        const newOrder = new Order({
            _userId: id,
            products: products,
            amount: amount,
            address: address,
            details: details,
        });

        await newOrder.save();
        return res.status(201).json({
            status: 201,
            message: `Added order successfully!`,
            result: newOrder,
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

exports.updateOrder = async (req, res) => {
    const order = req.order;
    const { products, ...others } = req.body;

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

        const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            {
                $set: {
                    products: products,
                    others
                }
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: `Order updated!`,
            result: updatedOrder
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

exports.deleteOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const id = req.body?.orderId;

    try {
        let objectIds = [];

        for (let i = 0; i < id.length; i++) {
            if (id[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `cartId must not contain empty strings.`
                });

            const convertId = await mongoose.Types.ObjectId(id[i])

            const findOrder = await Order.findById(convertId);
            if (!findOrder)
                return res.status(400).json({
                    status: 400,
                    message: `Order id: ${id[i]} not found.`
                });

            objectIds.push(convertId);
        }

        await Order.deleteMany(
            {
                _id: { $in: objectIds }
            }
        );

        return res.status(200).json({
            status: 200,
            message: `Deleted successfully.`
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of cart."
            });

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
}
