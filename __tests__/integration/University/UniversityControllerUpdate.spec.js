const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("University", () => {

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

    it("Should be able to update a University", async () => {

        const response = await request(app)
            .put('/university')
            .set("Authorization", universityId)
            .send({
                IES: "Unifei",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Itajubá",
                address: "Sei não",
                category: "pública",
                site: "https://unifei.edu.br/"
            })

        expect(response.status).toBe(204)
    })

    it("Shouldn't be able to update a University with a different authorization", async () => {

        const response = await request(app)
            .put('/university')
            .set("Authorization", 'debf92c1')
            .send({
                IES: "Unifei",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Itajubá",
                address: "Sei não",
                category: "pública",
                site: "https://unifei.edu.br/"
            })

        expect(response.status).toBe(401)
    })


    it("Shouldn't be able to update a University without authorization", async () => {

        const response = await request(app)
            .put('/university')
            .send({
                IES: "Unifei",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Itajubá",
                address: "Sei não",
                category: "pública",
                site: "https://unifei.edu.br/"
            })

        expect(response.body.statusCode).toBe(400)
    })
})