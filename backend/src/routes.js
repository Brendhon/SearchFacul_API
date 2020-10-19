const express = require('express') // Importando o modulo express
const UniversityController = require('./controllers/UniversityController')

// Extraindo o modulo Rotas do express e atribuindo-o a uma variável
const routes = express.Router()

routes.get('/university', UniversityController.list)

routes.post('/university', UniversityController.create)

module.exports = routes