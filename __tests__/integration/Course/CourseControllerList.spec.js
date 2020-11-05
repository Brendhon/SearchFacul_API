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

        // Adicionando 2 cursos para testes
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

        await request(app)
            .post('/course')
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

    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to list a Course by name", async () => {
        const response = await request(app)
            .get('/course/name/computação')

        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('IES')
        expect(response.body).toHaveLength(1);
    })

    it("Should be able to list a Course by id", async () => {
        const response = await request(app)
            .get('/course/2')

        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('IES')
        expect(response.body.name).toBe("Engenharia de Produção");
    })
})