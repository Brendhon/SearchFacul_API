const crypto = require('crypto')

const generateUniqueId = _ => crypto.randomBytes(4).toString('HEX')

module.exports = generateUniqueId