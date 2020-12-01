const express = require('express') // Importando o modulo express

const authorization = require('./middleware/authorization')
const integrity = require('./middleware/integrity')

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
routes.get('/profile', ProfileValidator.listCourses(), authorization.required, ProfileController.list)

// Rotas pertencentes a Universidades
routes.get('/university',
    UniversityValidator.list(),
    authorization.required,
    UniversityController.list)
routes.put('/university',
    UniversityValidator.update(),
    integrity.universityAttributes,
    authorization.required,
    UniversityController.update)
routes.post('/university', UniversityValidator.create(), integrity.universityAttributes, UniversityController.create)
routes.delete('/university', UniversityValidator.remove(), authorization.required, UniversityController.remove)

// Rotas pertencentes aos cursos
routes.get('/course/:id', CourseValidator.listByID(), CourseController.listById)
routes.get('/course/search/:option', CourseValidator.list(), CourseController.list)
routes.post('/course', CourseValidator.create(), integrity.courseAttributes, authorization.required, CourseController.create)
routes.delete('/course/:id', CourseValidator.remove(), authorization.required, CourseController.remove)
routes.put('/course/:id',
    CourseValidator.update(),
    integrity.courseAttributes,
    authorization.required,
    CourseController.update)

module.exports = routes