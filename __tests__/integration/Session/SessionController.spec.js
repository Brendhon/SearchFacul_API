const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("Session", () => {

    // Atributos
    let loginExample

    // Antes de todos execute...
    beforeAll(async () => {

        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados

        // Inserindo uma universidade no banco como teste
        await request(app)
            .post('/university')
            .send(CONSTANTS.universityExample)
    })

    // Antes de cada execute...
    beforeEach(() => {
        loginExample = Object.assign({}, CONSTANTS.loginExample) // Clonando o objetivo para não mexer na variável original
    })

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new session", async () => {

        const response = await request(app)
            .post('/session')
            .send(loginExample)

        expect(response.body.token).toBeTruthy()
    })

    it("Shouldn't be able to create a new session without email", async () => {

        delete loginExample["email"]

        const response = await request(app)
            .post('/session')
            .send(loginExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

    it("Shouldn't be able to create a new session with a without password", async () => {

        delete loginExample["password"]

        const response = await request(app)
            .post('/session')
            .send(loginExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["password"])
    })

    it("Shouldn't be able to create a new session with incorrect password", async () => {

        loginExample.password = 456

        const response = await request(app)
            .post('/session')
            .send(loginExample)

        expect(response.status).toBe(400)
    })
})