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

        // Realizando um login
        const response = await request(app)
            .post('/session')
            .send(CONSTANTS.loginExample)

        token = response.body.token // Pegando o ID resultante da resposta
    })

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to list all data belonging to the university", async () => {

        const response = await request(app)
            .get('/university')
            .set("Authorization", token)

        expect(response.body.ies).toBe("Inatel")

    })

    it("Shouldn't be able to list all data belonging to the university without authorization", async () => {

        const response = await request(app)
            .get('/university')

        expect(response.status).toBe(400)
    })
})