const express = require('express') // Importando o modulo express
const crypto = require('crypto')
const connection = require('./database/connection')

// Extraindo o modulo Rotas do express e atribuindo-o a uma variável
const routes = express.Router()

routes.get('/university', async (req, resp) => {
    const universities = await connection('university').select('*')
    return resp.json(universities)
})

routes.post('/university', async (req, resp) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, telephone, uf, city, longitude, latitude } = req.body

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
    return resp.json({ id }) 
})

module.exports = routes