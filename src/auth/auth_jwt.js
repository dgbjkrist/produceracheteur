const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        const message = "Aucun token fourni";
        res.status(403).json({ message })
    }

    jwt.verify(token, privateKey.secret,  (error, decodedToken) => {
        if (error) {
            const message = "Unauthorized!"
            res.status(401).json({ message })
        }

        let userId = decodedToken.id

        if (req.body.userId && req.body.id !== userId) {
            const message = "invalid user id"
            res.status(401).json({ message })
        } else {
            next()
        }
    });
}