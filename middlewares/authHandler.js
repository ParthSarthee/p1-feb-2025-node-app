const jwt = require("jsonwebtoken");
const secret = "test-test-test-test-test-test-test";

function verifyToken(req, res, next) {
    const token = req.headers["x-auth-token"];
    if (!token) {
        req.auth = false;
        next();
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) res.status(401).json({ message: "Invalid token." });
            else {
                req.auth = decoded;
                next();
            }
        })
    }

}


function isUser(req, res, next) {
    if (req.auth) next();
    else res.status(403).json({ message: "Forbidden." });
}



module.exports = { verifyToken, isUser };