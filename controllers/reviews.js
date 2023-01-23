const Technician = require("../models/Technician");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { BSONTypeError } = require("bson");
const { upload, getPathStorageFromUrl, getUserIdFromFilePath, deleteFile } = require("../utils/firebaseStorage");

exports.getRefById = async (req, res, next, id) => {
    try {
        const checkTechnician = await Technician.findOne({ _userId: mongoose.Types.ObjectId(id) });
        const checkProduct = await Product.findById(id);

        if (checkTechnician || checkProduct) {
            req.reference = mongoose.Types.ObjectId(id);
            next();
        } else {

            return res.status(400).json({
                status: 400,
                message: `Cannot find reference ID.`
            })
        }

    } catch (error) {
        console.log(error);
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of ref."
            });

        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.getReviewById = async (req, res, next, id) => {
    try {
        const refId = req.reference;
        const checkReview = await Review.findOne({
            _id: mongoose.Types.ObjectId(id), _refId: refId
        });

        if (!checkReview)
            return res.status(400).json({
                status: 400,
                message: "Cannot find review."
            })
        else {
            req.review = checkReview._doc;
            next();
        }

    } catch (error) {
        console.log(error);
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of review."
            });
        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.addReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const { _refId, _userId, stars, img, description } = req.body;
        const refId = mongoose.Types.ObjectId(_refId);
        const userId = mongoose.Types.ObjectId(_userId);

        const getRef = await checkRefInTechOrProduct(refId);
        if (!getRef)
            return res.status(400).json({
                status: 400,
                message: "Cannot find reference ID.",
            })

        const newReview = new Review({
            _refId: refId,
            _userId: userId,
            stars: stars,
            img: img,
            description: description,
        });

        await newReview.save();
        return res.status(200).json({
            status: 200,
            message: "Added review successfully!",
            result: newReview
        })

    } catch (error) {
        console.log(error);
        if (error instanceof BSONTypeError)
            return res.status(400).json({
                status: 400,
                message: "Must be valid id of user."
            });

        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.getAllReviewsOfRef = async (req, res) => {
    const id = req.reference;

    try {
        let { page = 1, limit = 10, user, sort, ...queries } = req.query;

        const query = {
            _refId: id
        }

        if (user)
            query._userId = user;

        const options = {
            page,
            limit,
            sort,
            queries
        }

        const reviews = await Review.paginate(query, options);

        return res.status(200).json({
            status: 200,
            result: reviews
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.getReview = (req, res) => {
    return res.status(200).json({
        status: 200,
        result: req.review
    })
}

exports.deleteReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg
        })
    }

    try {
        const reviewIds = req.body.reviewId;

        await Review.deleteMany(
            {
                _id: { $in: reviewIds }
            }
        )

        return res.status(200).json({
            status: 200,
            message: `Deleted successfully.`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.updateReview = async (req, res) => {
    try {
        const { ...newData } = req.body;

        if (newData._refId)
            return res.status(400).json({
                status: 400,
                message: "Cannot change _refId."
            })

        if (newData._userId)
            return res.status(400).json({
                status: 400,
                message: "Cannot change _userId."
            })

        if (newData.likes)
            return res.status(400).json({
                status: 400,
                message: "Cannot modify likes."
            })

        if (newData.likedBy)
            return res.status(400).json({
                status: 400,
                message: "Cannot modify likedBy."
            })

        const id = req.review._id;
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            newData,
            {
                new: true,
                runValidators: true,
            }
        )

        return res.status(200).json({
            status: 200,
            message: "Update successful!",
            result: updatedReview
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

exports.getAverageOfReviews = async (req, res) => {
    try {
        const refId = req.reference;

        const average = await Review.aggregate([
            {
                $match: {
                    _refId: refId
                }
            },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$stars" },
                }
            }
        ]);

        let getIndividualTotalStar = [];

        for (let i = 1; i <= 5; i++) {
            const individualTotalStar = await Review.aggregate([
                {
                    $match: {
                        _refId: refId,
                        stars: i
                    }
                },
                {
                    $group: {
                        _id: i,
                        total: { $sum: 1 }
                    }
                }
            ])

            if (individualTotalStar[0] === undefined) {
                const totalStar = {
                    _id: i,
                    total: 0
                }
                getIndividualTotalStar.push(totalStar);
            } else {
                getIndividualTotalStar.push(individualTotalStar[0]);
            }

        }

        let result = {
            totalAverage: Math.round(average[0].avg * 100) / 100,
            totalIndividualStars: getIndividualTotalStar
        }

        return res.status(200).json({
            status: 200,
            message: "Review statistics retrieved successfully.",
            result: result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: error,
        })
    }
}

// File upload
exports.uploadImage = async (req, res) => {
    const images = req?.files;
    const { _id } = req?.review;

    if (!images)
        return res.status(400).json({
            status: 400,
            message: `Insert images to upload.`,
        })

    try {
        let result = [];

        const uploadImages = await new Promise((resolve, reject) => {
            images.forEach((image, index, array) => {
                let ref = `reviews/${_id}/images/${image.originalname}`;
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
            fileUrls.forEach(async (url, index, array) => {
                const filePath = getPathStorageFromUrl(url);

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
    const { _id } = req?.review;

    if (!documents)
        return res.status(400).json({
            status: 400,
            message: `Insert documents to upload.`,
        })

    try {
        let result = [];

        const uploadDocs = await new Promise((resolve, reject) => {
            documents.forEach((document, index, array) => {
                let ref = `reviews/${_id}/documents/${document.originalname}`;
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

const checkRefInTechOrProduct = async (objectId) => {
    const checkRefInTech = await Technician.findOne({ _userId: objectId });
    const checkRefInProduct = await Product.findById(objectId);

    if (checkRefInTech)
        return checkRefInTech;
    else if (checkRefInProduct)
        return checkRefInProduct;
    else
        return null;
}