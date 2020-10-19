const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { id } = request.body

    // Verificando integridade dos dados
    if (!id) return response.status(400).json({ error: 'Necessita de um ID' })

    try {

        // Realizando um destruction no array resultado da inserção para pegar o id gerado
        const university = await connection('university')
            .where('id', id)
            .first()

        if (!university) return response.status(400).json({ error: 'Universidade não encontrada' })

        // Retornando o ID como resposta 
        return response.json(university)

    } catch {

        return response.status(500).json({ error: 'Falha ao criar a sessão' })

    }
}

module.exports = { create }