var jwt = require('jsonwebtoken')
exports.TokenVerify = (req, res, next) => {
    var token = req.headers["token"];
    jwt.verify(token, "secretKey123", (err, decoded) => {
        if (err) {
            res.status(401).send(err)
        } else {
            let email = decoded.data[0]['email'];
            req.headers.email = email;
            next();

        }
    })

}

