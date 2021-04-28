const jwt = require("jsonwebtoken");
const secretKey = "mern-secret-key";

module.exports = (req, res, next) => {
    if (req.options === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({message: "Auth error"});
    }
};