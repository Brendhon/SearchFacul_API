const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("Course", () => {

    // Atributos
    let token

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

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to delete a Course", async () => {
        const response = await request(app)
            .delete('/course/1')
            .set("Authorization", token)

        expect(response.status).toBe(204)
    })

    it("Shouldn't be able to delete a Course without authorization", async () => {
        const response = await request(app)
            .delete('/course/1')

        expect(response.body.statusCode).toBe(400)
    })

    it("Shouldn't be able to delete a Course with a different authorization", async () => {
        const response = await request(app)
            .delete('/course/1')
            .set("Authorization", '12345678')

        expect(response.status).toBe(400)
    })
})