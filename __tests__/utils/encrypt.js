const crypto = require('crypto')
const secret = '288f581628bba704c1f3ba076f82e70b' // Senha que será usada para criptografar e descriptografar o texto teve ter 32 caracteres

const encrypt = text => {
    const iv = Buffer.from(crypto.randomBytes(16)) // Criando um vetor inicial com os bytes 16
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv)

    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

module.exports = encrypt