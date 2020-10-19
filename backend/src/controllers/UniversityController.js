const crypto = require('crypto')
const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, telephone, uf, city, longitude, latitude } = request.body

    // Gerando um id aleatório de 2 bytes no formato string
    const id = crypto.randomBytes(2).toString('HEX')

    // Verificando integridade dos dados
    if (!name) return response.status(400).json({ error: 'Nome inválido' })
    if (!telephone) return response.status(400).json({ error: 'Telefone inválido' })
    if (!uf) return response.status(400).json({ error: 'UF inválido' })
    if (!city) return response.status(400).json({ error: 'Cidade inválida' })
    if (!longitude) return response.status(400).json({ error: 'Longitude inválida' })
    if (!latitude) return response.status(400).json({ error: 'Latitude inválida' })

    try {

        // Inserindo dados na tabela
        await connection('university').insert({
            id,
            name,
            telephone,
            uf,
            city,
            longitude,
            latitude
        })

        // Retornando o ID como resposta 
        return response.json({ id })

    } catch (error) {
        return response.status(500).json({ error: 'Falha ao criar' })
    }
}

const list = async (request, response) => {
    try {
        const universities = await connection('university').select('*')
        return response.json(universities)
    } catch (error) {
        return response.status(500).json({ error: 'Falha ao buscar' })
    }
}

module.exports = { create, list }