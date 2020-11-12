const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

const encryptPassword = password => {
    return bcrypt.hash(password, 8)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const encodeJwt = (payload) => {
    return jwt.encode(payload, process.env.AUTH_SECRET || "12345")
}

const decodeJwt = (token) => {
    return jwt.decode(token, process.env.AUTH_SECRET || "12345")
}

module.exports = { encryptPassword, comparePassword, encodeJwt, decodeJwt }