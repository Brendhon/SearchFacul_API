// Importando o modulo express
const express = require('express')

const routes = express.Router()

routes.get('/', (req, resp) => {
    resp.send('hello')
})

routes.post('/', (req, resp) => {
    resp.send(req.body)
})

module.exports = routes