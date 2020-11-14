const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("Session", () => {

    beforeAll(async () => {

        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados

        // Inserindo um dado no banco como teste
        await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })
    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new session", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                email: "guilherme@gmail.br",
                password: "123"
            })

        expect(response.body.token).toBeTruthy()
    })

    it("Shouldn't be able to create a new session without email", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                password: "123"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

    it("Shouldn't be able to create a new session with a without password", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                email: "guilherme@gmail.br",
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["password"])
    })

    it("Shouldn't be able to create a new session with incorrect password", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                email: "guilherme@gmail.br",
                password: "456"
            })

        expect(response.status).toBe(400)
    })
})