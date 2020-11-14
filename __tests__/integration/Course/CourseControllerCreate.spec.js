const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("Course", () => {

    let token

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

        const response = await request(app)
            .post('/session')
            .send({
                email: "guilherme@gmail.br",
                password: "123"
            })

        token = response.body.token // Pegando o ID resultante da resposta

    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new Course", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new Course without authorization", async () => {
        const response = await request(app)
            .post('/course')
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
    })

    it("Shouldn't be able to create a new Course with a different authorization", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", '12345678')
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.status).toBe(400)
    })

    it("Shouldn't be able to create a new Course without name", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["name"])
    })

    it("Shouldn't be able to create a new Course without description", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["description"])
    })

    it("Shouldn't be able to create a new Course without duration", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["duration"])
    })

    it("Shouldn't be able to create a new Course without titration", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                modality: "Presencial",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["titration"])
    })

    it("Shouldn't be able to create a new Course without modality", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                score: 4
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["modality"])
    })

    it("Should be able to create a new Course without score", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial"
            })

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new Course with incorrect score", async () => {
        const response = await request(app)
            .post('/course')
            .set("Authorization", token)
            .send({
                name: "Engenharia de computação",
                description: "Melhor Curso",
                duration: "5 anos",
                titration: "Bacharelado",
                modality: "Presencial",
                score: 6
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["score"])
    })
})