const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe("University", () => {

    beforeEach(async () => {
        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados
    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    });

    it("Should be able to create a new University", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                universityName: "Inatel",
                telephone: "34546789",
                uf: "MG",
                city: "Santa Rita",
                street: "Sei não",
                number: 70,
                site: "https://inatel.br/home/"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8);
    })

})