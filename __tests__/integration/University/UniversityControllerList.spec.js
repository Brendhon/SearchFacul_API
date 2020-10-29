const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const encrypt = require('../../utils/encrypt')

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

    it("Should be able to list a University by city", async () => {

        const response = await request(app)
            .get('/university/city/santa')

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].city).toBe('Santa Rita')
    })

    it("Should be able to list a University by name", async () => {

        const response = await request(app)
            .get('/university/ies/inatel')

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].IES).toBe('Inatel')
    })

    it("Should be able to list all courses belonging to university", async () => {

        // Inserindo um Curso no banco como teste
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

        universityId = encrypt(universityId)

        const response = await request(app)
            .get(`/university/${universityId}`)

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].score).toBe(4)


    })
})