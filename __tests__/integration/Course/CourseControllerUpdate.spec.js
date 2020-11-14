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

        // Realizando o login
        const response = await request(app)
            .post('/session')
            .send(CONSTANTS.loginExample)

        token = response.body.token // Pegando o ID resultante da resposta

        // Adicionando 1 curso para testes
        await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(CONSTANTS.courseExample)

    })

    // Antes de cada execute...
    beforeEach(() => {
        courseExample = Object.assign({}, CONSTANTS.courseExample2) // Clonando o objetivo para não mexer na variável original
    })

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to update a Course", async () => {
        const response = await request(app)
            .put('/course/1')
            .set("Authorization", token)
            .send(courseExample)

        expect(response.status).toBe(204)
    })

    it("Shouldn't be able to update a Course without authorization", async () => {
        const response = await request(app)
            .put('/course/1')
            .send(courseExample)

        expect(response.body.statusCode).toBe(400)
    })

    it("Shouldn't be able to update a Course with a different authorization", async () => {
        const response = await request(app)
            .put('/course/1')
            .set("Authorization", '12345678')
            .send(courseExample)

        expect(response.status).toBe(400)
    })
})