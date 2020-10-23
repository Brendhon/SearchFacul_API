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
routes.post('/session', SessionValidator.sessionPost(), SessionController.create)

// Rotas pertencentes a Universidades
routes.get('/university', UniversityController.list)
routes.post('/university', UniversityValidator.universityPost(), UniversityController.create)
routes.delete('/university', UniversityController.remove)

// Rotas pertencentes a um perfil da faculdade
routes.get('/profile', ProfileValidator.profileGet(), ProfileController.list)

// Rotas pertencentes aos cursos
routes.get('/course/:name', CourseValidator.courseGet(), CourseController.list)
routes.post('/course', CourseValidator.coursePost(), CourseController.create)
routes.delete('/course/:id', CourseValidator.courseDelete(), CourseController.remove)

module.exports = routes