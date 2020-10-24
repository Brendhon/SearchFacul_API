const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { id } = request.body

    await connection('university')
        .where('id', id)
        .first()
        .then(university => {
            if (!university) return response.status(400).json({ message: 'Universidade não encontrada' }) // Verificando se Universidade foi encontrada
            else return response.json(university) // Retornando o objeto como resposta 
        })
        .catch(_ => response.status(500).json({ message: 'Falha ao criar a sessão' }))

}

module.exports = { create }