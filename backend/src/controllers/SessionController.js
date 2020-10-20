const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { id } = request.body

    try {

        const university = await connection('university')
            .where('id', id)
            .first()

        if (!university) return response.status(400).json({ message: 'Universidade não encontrada' })

        // Retornando o objeto como resposta 
        return response.json(university)

    } catch {

        return response.status(500).json({ message: 'Falha ao criar a sessão' })

    }
}

module.exports = { create }