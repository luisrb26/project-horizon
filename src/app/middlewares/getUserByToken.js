const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.JWT_KEY

module.exports = async (token) => {
    if (!token) {
        return res.status(401).json({
            "errors": [
                {
                    "msg": "É necessário informar um token",
                }
            ]
        })
    }
    const user = jwt.decode(token, key)
    return user
}