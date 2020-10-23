const crypto = require('crypto')
const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { universityName, telephone, uf, city, street, number } = request.body

    // Gerando um id aleatório de 2 bytes no formato string
    const id = crypto.randomBytes(2).toString('HEX')

    try {

        // Inserindo dados na tabela
        await connection('university').insert({
            id,
            universityName,
            telephone,
            uf,
            city,
            street,
            number
        })

        // Retornando o ID como resposta 
        return response.json({ id })

    } catch {
        return response.status(400).json({ message: 'Falha ao criar' })
    }
}

const list = async (request, response) => {
    try {
        const universities = await connection('university').select('*')
        return response.json(universities)
    } catch {
        return response.status(400).json({ message: 'Falha ao buscar as Universidades' })
    }
}

module.exports = { create, list }