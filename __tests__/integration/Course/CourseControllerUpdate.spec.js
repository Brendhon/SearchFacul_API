const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("Course", () => {

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

        universityId = universityId.body.id // Pegando o ID resultante da resposta

        // Adicionando 1 curso para testes
        await request(app)
            .post('/course')
            .set("Authorization", universityId)
            .send({
                name: "Engenharia de computação",
                email: "guilherme@gmail.br",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to update a Course", async () => {
        const response = await request(app)
            .put('/course/1')
            .set("Authorization", universityId)
            .send({
                name: "Engenharia de Produção",
                email: "marcos@gmail.br",
                description: "ADM com CREA",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.status).toBe(204)
    })

    it("Shouldn't be able to update a Course without authorization", async () => {
        const response = await request(app)
            .put('/course/1')
            .send({
                name: "Engenharia de Produção",
                email: "marcos@gmail.br",
                description: "ADM com CREA",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
    })

    it("Shouldn't be able to update a Course with a different authorization", async () => {
        const response = await request(app)
            .put('/course/1')
            .set("Authorization", '12345678')
            .send({
                name: "Engenharia de Produção",
                email: "marcos@gmail.br",
                description: "ADM com CREA",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.status).toBe(401)
    })
})