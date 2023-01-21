const Product = require("../models/Product");
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const SellerDetails = require("../models/SellerDetails");
const { validationResult } = require("express-validator");
const { BSONTypeError } = require("bson");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const { deleteSpecification } = require("./specifications/deleteSpecification");

const { upload, getPathStorageFromUrl, getUserIdFromFilePath, deleteFile } = require("../utils/firebaseStorage");

exports.uploadImage = async (req, res) => {
    const images = req?.files;
    const productId = req?.product._id;

    if (!images)
        return res.status(400).json({
            status: 400,
            message: `Insert images to upload.`,
        })

    try {
        let result = [];

        const uploadImages = await new Promise((resolve, reject) => {
            images.forEach((image, index, array) => {
                let ref = `products/${productId}/images/${image.originalname}`;
                upload(image, ref).then((data, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    result.push(data);
                    if (index === array.length - 1)
                        resolve();
                });
            });

        }).then(() => {

            return res.status(200).json({
                status: 200,
                message: `Images uploaded!`,
                result: result,
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.deleteFiles = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const fileUrls = req.body?.fileUrls;

    try {
        await new Promise((resolve, reject) => {
            fileUrls.forEach( async (url, index, array) => {
                const filePath = getPathStorageFromUrl(url);

                const rootPath = `products/`;
                const productId = getUserIdFromFilePath(filePath, rootPath);
        
                if (productId !== req.product._id.toString())
                    return res.status(400).json({
                        status: 400,
                        message: `Cannot delete other user's files.`
                    })
        
                deleteFile(filePath).then((result, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    if (index === array.length - 1)
                        resolve();
                });
            })
        }).then(() => {
            return res.status(200).json({
                status: 200,
                message: `Deleted successfully.`
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.uploadDocs = async (req, res) => {
    const documents = req?.files;
    const productId = req?.product._id;

    if (!documents)
        return res.status(400).json({
            status: 400,
            message: `Insert documents to upload.`,
        })

    try {
        let result = [];

        const uploadDocs = await new Promise((resolve, reject) => {
            documents.forEach((document, index, array) => {
                let ref = `products/${productId}/documents/${document.originalname}`;
                upload(document, ref).then((data, err) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            message: err,
                        })

                    result.push(data);
                    if (index === array.length - 1)
                        resolve();
                });
            });

        }).then(() => {

            return res.status(200).json({
                status: 200,
                message: `Documents uploaded!`,
                result: result,
            });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error,
        })
    }
}

exports.getProductById = (req, res, next, id) => {
    try {
        Product.findById(mongoose.Types.ObjectId(id)).exec((error, product) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!product)
                return res.status(400).json({
                    status: 400,
                    message: "Product not found."
                })
            else {
                req.product = product._doc;
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

exports.getSellerById = (req, res, next, id) => {
    try {
        SellerDetails.findById(mongoose.Types.ObjectId(id)).exec((error, seller) => {
            if (error)
                return res.status(400).json({
                    status: 400,
                    message: error
                })
            else if (!seller)
                return res.status(400).json({
                    status: 400,
                    message: "Seller not found."
                })
            else {
                req.seller = seller._doc;
                next();
            }
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

exports.getAllProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, type = "", name = 1, search = "", ...queries } = req.query;

        const query = {
            name: {
                $regex: search, $options: 'i'
            },
            type: type.toUpperCase()
        }

        const options = {
            page,
            limit,
            sort: {
                name: name
            },
            queries
        }

        const products = await Product.paginate(query, options);

        return res.status(200).json({
            status: 200,
            result: products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.getAllProductsOfSeller = async (req, res) => {
    const { _id } = req.seller;
    try {
        let { page = 1, limit = 10, type = "", name = 1, search = "", ...queries } = req.query;

        const query = {
            _sellerId: _id,
            name: {
                $regex: search, $options: 'i'
            },
            type: type.toUpperCase()
        }

        const options = {
            page,
            limit,
            sort: {
                name: name
            },
            queries
        }

        const products = await Product.paginate(query, options);

        return res.status(200).json({
            status: 200,
            result: products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            result: req.product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error
        });
    }
};

exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const { _sellerId, name, description, category, price, img, stock } = req.body;

    for (let i = 0; i < img.length; i++) {
        if (img[i] === "")
            return res.status(400).json({
                status: 400,
                message: `img must not contain empty strings.`
            });
    }

    try {
        const convertCategory = category.toUpperCase();
        const sellerId = mongoose.Types.ObjectId(_sellerId);

        const checkCategory = await Category.findOne({ name: convertCategory });
        if (!checkCategory)
            return res.status(400).json({
                status: 400,
                message: `Category: ${category} not found.`
            });

        const checkSeller = await SellerDetails.findById(sellerId);
        if (!checkSeller)
            return res.status(400).json({
                status: 400,
                message: `Seller Id: ${_sellerId} not found.`
            });

        const newProduct = new Product({
            _sellerId: sellerId,
            name,
            description,
            category: convertCategory,
            price,
            img,
            stock
        });

        await newProduct.save();
        return res.status(200).json({
            status: 200,
            message: `Product successfully added!`,
            result: newProduct
        });

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
        });
    }
};

exports.updateProduct = async (req, res) => {
    if (req.body._sellerId)
        return res.status(400).json({
            status: 400,
            message: "_sellerId cannot be changed."
        });

    const { ...body } = req.body;
    const id = req.product._id;

    try {
        if (body.category) {
            const convertCategory = body.category.toUpperCase();
            const checkCategory = await Category.findOne({ name: convertCategory });
            if (!checkCategory)
                return res.status(400).json({
                    status: 400,
                    message: `Category: ${body.category} not found.`
                });

            body.category = convertCategory;
        }

        if (body.img) {
            const img = body.img;
            for (let i = 0; i < img.length; i++) {
                if (img[i] === "")
                    return res.status(400).json({
                        status: 400,
                        message: `img must not contain empty strings.`
                    });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )

        return res.status(200).json({
            status: 200,
            message: `Product successfully updated!`,
            result: updatedProduct
        });


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
        });
    }
};

exports.deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    const id = req.body?.productId;

    try {
        let objectIds = [];
        let categories = [];

        for (let i = 0; i < id.length; i++) {
            if (id[i] === "")
                return res.status(400).json({
                    status: 400,
                    message: `id must not contain empty strings.`
                });

            const convertId = await mongoose.Types.ObjectId(id[i])

            const findProduct = await Product.findById(convertId);
            if (!findProduct)
                return res.status(400).json({
                    status: 400,
                    message: `Product id: ${id[i]} not found.`
                });

            objectIds.push(convertId);
            categories.push(findProduct.category)
        }

        await deleteSpecification(objectIds, categories);
        await Product.deleteMany(
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