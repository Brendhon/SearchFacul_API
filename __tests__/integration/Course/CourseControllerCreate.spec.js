const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("Course", () => {

    // Atributos
    let token
    let courseExample

    // Antes de todos execute...
    beforeAll(async () => {

        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados

        // Inserindo um dado no banco como teste
        await request(app)
            .post('/university')
            .send(CONSTANTS.universityExample)

        const response = await request(app)
            .post('/session')
            .send(CONSTANTS.loginExample)

        token = response.body.token // Pegando o ID resultante da resposta

    })

    // Antes de cada execute...
    beforeEach(() => {
        courseExample = Object.assign({}, CONSTANTS.courseExample) // Clonando o objetivo para não mexer na variável original
    })

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new Course", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new Course without authorization", async () => {
        const response = await request(app)
            .post('/course')
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
    })

    it("Shouldn't be able to create a new Course with a different authorization", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", '12345678')
            .send(courseExample)

        expect(response.status).toBe(400)
    })

    it("Shouldn't be able to create a new Course without name", async () => {

        delete courseExample["name"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["name"])
    })

    it("Shouldn't be able to create a new Course without description", async () => {

        delete courseExample["description"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)


        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["description"])
    })

    it("Shouldn't be able to create a new Course without duration", async () => {

        delete courseExample["duration"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["duration"])
    })

    it("Shouldn't be able to create a new Course without titration", async () => {

        delete courseExample["titration"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["titration"])
    })

    it("Shouldn't be able to create a new Course without modality", async () => {

        delete courseExample["modality"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["modality"])
    })

    it("Should be able to create a new Course without score", async () => {

        delete courseExample["score"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new Course with incorrect score", async () => {

        courseExample.score = 6  // Atribuindo um valor inválido

        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["score"])
    })
})