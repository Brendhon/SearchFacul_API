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

// Rotas pertencentes a um perfil da faculdade
routes.get('/profile', ProfileValidator.listCourses(), ProfileController.list)

// Rotas pertencentes a Universidades
routes.get('/university/:id', UniversityValidator.listCourses(), UniversityController.listCourses)
routes.get('/university/ies/:name', UniversityValidator.listByName(), UniversityController.listByName)
routes.get('/university/city/:city', UniversityValidator.listByCity(), UniversityController.listByCity)
routes.put('/university', UniversityValidator.update(), UniversityController.update)
routes.post('/university', UniversityValidator.create(), UniversityController.create)
routes.delete('/university', UniversityValidator.remove(), UniversityController.remove)

// Rotas pertencentes aos cursos
routes.get('/course/:id', CourseValidator.listByID(), CourseController.listById)
routes.get('/course/name/:name', CourseValidator.listByName(), CourseController.listByName)
routes.post('/course', CourseValidator.create(), CourseController.create)
routes.delete('/course/:id', CourseValidator.remove(), CourseController.remove)
routes.put('/course/:id', CourseValidator.update(), CourseController.update)

module.exports = routes