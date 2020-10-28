const crypto = require('crypto')
const { secret } = require('./Secret.json')

const decrypt = encrypted => {

    const [iv, encryptedText] = encrypted.split(':')

    const ivBuffer = Buffer.from(iv, 'hex') // Voltar para bytes do Hex
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), ivBuffer)

    let content = decipher.update(Buffer.from(encryptedText, 'hex'))
    content = Buffer.concat([content, decipher.final()])

    return content.toString()
}

module.exports = decrypt