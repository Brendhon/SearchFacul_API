const connection = require('../database/connection')
const { comparePassword, encodeJwt } = require('../utils/auth')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { email, password } = request.body

    await connection('university')
        .where('email', email)
        .first()
        .then(async university => {
            
            // Verificando se Universidade foi encontrada
            if (!university) return response.status(400).json({ message: 'Email não cadastrado' }) 

            const samePassword = await comparePassword(password, university.password)

            if (samePassword) return response.json({
                token: encodeJwt({id: university.id, email: university.email})
            }) // Retornando o token como resposta 
            
            else return response.status(400).json({ message: 'Senha incorreta' })

        })
        .catch(_ => response.status(500).json({ message: 'Falha ao criar a sessão' }))

}

module.exports = { create }