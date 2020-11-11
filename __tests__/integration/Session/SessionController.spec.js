const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("Session", () => {

    let universityId

    beforeAll(async () => {

        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados

        // Inserindo um dado no banco como teste
        universityId = await request(app)
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

        universityId = universityId.body.id // Pegando o ID resultante
    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new session", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                id: universityId
            })

        expect(response.body.id).toBeTruthy()
        expect(response.body.city).toBe('Santa Rita')
    })

    it("Shouldn't be able to create a new session without id", async () => {

        const response = await request(app)
            .post('/session')
            .send({})

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["id"])
    })

    it("Shouldn't be able to create a new session with a nonexistent id", async () => {

        const response = await request(app)
            .post('/session')
            .send({
                id: '12345678'
            })

        expect(response.status).toBe(400)
    })
})