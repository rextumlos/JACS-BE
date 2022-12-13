const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (error, user) => {
            if(error) return res.status(403).json({
                status: 403,
                message: "Invalid token."
            });

            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({
            status: 401,
            message: "Authentication required."
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "Access denied."
            })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "Access denied."
            })
        }
    })
}

const verifyTokenAndSellerAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const { _userId } = req.seller;
        if (req.user.id === _userId.toString() && req.user.isSeller || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "You are not a seller."
            })
        }
    })
}

const verifyTokenAndTechnicianAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const { _id } = req.profile;
        if (req.user.id === _id.toString() && req.user.isTechnician || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: "You are not a technician."
            })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization, verifyTokenAndTechnicianAuthorization };