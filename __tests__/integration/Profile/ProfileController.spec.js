const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("Profile", () => {

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

    it("Should be able to show profile", async () => {

        const response = await request(app)
            .get('/profile')
            .set("Authorization", universityId)

        expect(response.status).toBe(200)
    })

    it("Shouldn't be able to show profile without authorization", async () => {

        const response = await request(app)
            .get('/profile')

        expect(response.body.statusCode).toBe(400)
    })

})