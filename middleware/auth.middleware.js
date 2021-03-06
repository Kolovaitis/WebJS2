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
        console.log(token)
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        req.userId = decoded.id;
        console.log(req.userId)
        next();
    } catch (e) {
        return res.status(401).json({message: "Auth error"});
    }
};