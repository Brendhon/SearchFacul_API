const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("University", () => {

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

        token = response.body.token // Pegando o token resultante da resposta
    })

    // Antes de cada execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to update a University", async () => {

        const response = await request(app)
            .put('/university')
            .set("Authorization", token)
            .send(CONSTANTS.universityExample2)

        expect(response.status).toBe(204)
    })

    it("Shouldn't be able to update a University with a different authorization", async () => {

        const response = await request(app)
            .put('/university')
            .set("Authorization", 'debf92c1')
            .send(CONSTANTS.universityExample2)

        expect(response.status).toBe(400)
    })


    it("Shouldn't be able to update a University without authorization", async () => {

        const response = await request(app)
            .put('/university')
            .send(CONSTANTS.universityExample2)

        expect(response.body.statusCode).toBe(400)
    })
})