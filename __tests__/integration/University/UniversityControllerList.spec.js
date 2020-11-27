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

    it("Should be able to list all courses belonging to university", async () => {

        // Inserindo um Curso no banco como teste
        await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(CONSTANTS.courseExample)

        const response = await request(app)
            .get('/university/1')

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].score).toBe(4)


    })
})