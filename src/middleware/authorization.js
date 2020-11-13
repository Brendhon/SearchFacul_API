const { decodeJwt } = require('../utils/auth')

const required = (request, response, next) => {

    // Pagando o Authorization do header
    const token = request.headers.authorization

    // Verificando se o authorization esta presente
    if (!token) return response.status(401).json({ message: 'Você precisa estar autenticado para realizar esta operação.' })

    try {

        const decode = decodeJwt(token)

        if (decode) {
            request.id = decode
            return next()
        }

        else return response.status(401).json({ message: 'Token incorreto' })

    } catch (_) {
        return response.status(400).json({ message: 'Token incorreto' })
    }


}

module.exports = { required }