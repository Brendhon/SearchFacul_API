const express = require('express') // Importando o modulo express

const UniversityController = require('./controllers/UniversityController')
const CourseController = require('./controllers/CourseController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const CourseValidator = require('./validators/CourseValidator')
const ProfileValidator = require('./validators/ProfileValidator')
const UniversityValidator = require('./validators/UniversityValidator')
const SessionValidator = require('./validators/SessionValidator')

// Extraindo o modulo Rotas do express e atribuindo-o a uma variável
const routes = express.Router()

// Rota para o Login (Sessão) da universidade
routes.post('/session', SessionValidator.create(), SessionController.create)

// Rotas pertencentes a Universidades
routes.get('/university', UniversityController.list)
routes.post('/university', UniversityValidator.create(), UniversityController.create)
routes.delete('/university',UniversityValidator.remove(), UniversityController.remove)

// Rotas pertencentes a um perfil da faculdade
routes.get('/profile', ProfileValidator.listCourses(), ProfileController.list)

// Rotas pertencentes aos cursos
routes.get('/course/:name', CourseValidator.list(), CourseController.list)
routes.post('/course', CourseValidator.create(), CourseController.create)
routes.delete('/course/:id', CourseValidator.remove(), CourseController.remove)

module.exports = routes