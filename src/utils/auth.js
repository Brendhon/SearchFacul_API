const bcrypt = require('bcrypt')

const encryptPassword = password => {
    return bcrypt.hash(password, 8)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { encryptPassword, comparePassword }