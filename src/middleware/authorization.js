const { decodeJwt } = require('../utils/auth')

const required = (request, response, next) => {

    // Pagando o Authorization do header
    const token = request.headers.authorization

    // Verificando se o authorization esta presente
    if (!token) return response.status(401).json({ message: 'Você precisa estar autenticado para realizar esta operação.' })

    const decode = decodeJwt(token)

    if (decode) {
        request.id = decode
        return next()
    }
    else return response.status(401).json({ message: 'Deu ruim!' })
    
}

module.exports = { required }