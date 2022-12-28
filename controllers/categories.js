const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { BSONTypeError } = require("bson");

exports.getCategoryById = (req, res, next, id) => {
    try {
        Category.findById(mongoose.Types.ObjectId(id)).exec((error, category) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!category)
                return res.status(400).json({
                    status: 400,
                    message: "Category not found."
                })
            else {
                req.category = category._doc;
                next();
            }
        })
    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of category."
            });
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        let { query, page = 1, limit = 10 } = req.query;

        const options = {
            page: page,
            limit: limit
        };

        const categories = await Category.paginate(query, options)

        return res.status(200).json({
            status: 200,
            result: categories
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.getCategory = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            result: req.category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { name, type } = req.body;

    try {
        const newCategory = new Category({
            name: name.toUpperCase(),
            type: type.toUpperCase()
        });

        await newCategory.save()

        return res.status(200).json({
            status: 200,
            message: `Category successfully added!`,
            result: newCategory
        });

    } catch (error) {
        if (error?.code === 11000)
            return res.status(400).json({
                status: 400,
                message: `"${name}" already existed. Must be unique.`
            })

        if (error?.name === "ValidationError")
            return res.status(400).json({
                status: 400,
                message: error.errors.type.message
            })

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.updateCategory = async (req, res) => {
    const id = req.category?._id;
    const { name, type } = req.body;
    if (name !== undefined)
        req.body.name = name.toUpperCase();

    if (type !== undefined)
        req.body.type = type.toUpperCase();

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            status: 200,
            message: `Category successfully updated!`,
            result: updatedCategory
        });

    } catch (error) {
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });

        if (error?.code === 11000)
            return res.status(400).json({
                status: 400,
                message: `"${name}" already existed. Must be unique.`
            })

        if (error?.name === "ValidationError")
            return res.status(400).json({
                status: 400,
                message: error.errors.type.message
            })

        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.deleteCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const id = req.body?.id;

    try {
        let objectIds = [];

        for (let i = 0; i < id.length; i++) {
            if (id[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `id must not contain empty strings.`
                });

            const convertId = await mongoose.Types.ObjectId(id[i])

            const findCategory = await Category.findById(convertId);
            if (!findCategory)
                return res.status(400).json({
                    status: 400,
                    message: `Category id: ${id[i]} not found.`
                });

            const findExistingProducts = await Product.findOne({
                category: findCategory?.name
            });
            if (findExistingProducts)
                return res.status(400).json({
                    status: 400,
                    message: `Category id: ${id[i]} has products and cannot be deleted.`
                });

            objectIds.push(convertId);
        }

        await Category.deleteMany(
            {
                _id: { $in: objectIds }
            }
        )

        return res.status(200).json({
            status: 200,
            message: `Deleted successfully.`
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
};
