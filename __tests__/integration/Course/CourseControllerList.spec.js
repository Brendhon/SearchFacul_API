const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("Course", () => {

    // Atributos
    let token

    // Antes de todos execute...
    beforeAll(async () => {

        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados

        // Inserindo um dado no banco como teste
        await request(app)
            .post('/university')
            .send(CONSTANTS.universityExample)

        const response = await request(app)
            .post('/session')
            .send(CONSTANTS.loginExample)

        token = response.body.token // Pegando o Token resultante da resposta

        // Adicionando 2 cursos para testes
        await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(CONSTANTS.courseExample)

        await request(app)
            .post('/course')
            .set("Authorization", token)
            .send(CONSTANTS.courseExample2)
    })

    // Depois de todos execute...
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
    
    it("Should be able to list a course by city", async () => {

        const response = await request(app)
            .get('/course/city/santa')

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].city).toBe('Santa Rita')
    })

    it("Should be able to list a course by ies", async () => {

        const response = await request(app)
            .get('/course/ies/inatel')

        expect(response.body[0].id).toBeTruthy()
        expect(response.body[0].IES).toBe('Inatel')
    })

    it("Should be able to list a Course by id", async () => {
        const response = await request(app)
            .get('/course/2')

        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('IES')
        expect(response.body.name).toBe("Engenharia de Produção");
    })
})