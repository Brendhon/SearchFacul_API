const express = require('express') // Importando o modulo express
const UniversityController = require('./controllers/UniversityController')
const CourseController = require('./controllers/CourseController')

// Extraindo o modulo Rotas do express e atribuindo-o a uma variável
const routes = express.Router()

// Rotas pertencentes a Universidades
routes.get('/university', UniversityController.list)
routes.post('/university', UniversityController.create)

// Rotas pertencentes aos cursos
routes.get('/course', CourseController.list)
routes.post('/course', CourseController.create)
routes.delete('/course/:id', CourseController.remove)

module.exports = routes