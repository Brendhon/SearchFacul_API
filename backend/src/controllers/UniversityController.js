const crypto = require('crypto')
const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, telephone, uf, city, longitude, latitude } = request.body

    // Gerando um id aleatório de 2 bytes no formato string
    const id = crypto.randomBytes(2).toString('HEX')

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
}

const list = async (request, response) => {
    const universities = await connection('university').select('*')
    return response.json(universities)
}

module.exports = { create, list }