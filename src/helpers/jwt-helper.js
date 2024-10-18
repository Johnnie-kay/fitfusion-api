const jwt = require('jsonwebtoken')
const VerifyJwtToken = (token) => {
    return jwt.verify(token, process.env.JWT_TOKEN)
}
module.exports = { VerifyJwtToken }