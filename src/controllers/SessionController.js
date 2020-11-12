const connection = require('../database/connection')
const { comparePassword } = require('../utils/auth')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { email, password } = request.body

    await connection('university')
        .where('email', email)
        .first()
        .then(async university => {

            if (!university) return response.status(400).json({ message: 'Universidade não encontrada' }) // Verificando se Universidade foi encontrada

            const samePassword = await comparePassword(password, university.password)

            if (samePassword) return response.json(university) // Retornando o objeto como resposta 
            else return response.status(400).json({ message: 'Senha incorreta' }) // Verificando se Universidade foi encontrada

        })
        .catch(_ => response.status(500).json({ message: 'Falha ao criar a sessão' }))

}

module.exports = { create }