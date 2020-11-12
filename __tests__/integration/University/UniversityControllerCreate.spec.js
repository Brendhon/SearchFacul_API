const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')

describe("University", () => {

    beforeAll(async () => {
        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados
    })

    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new University", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.com.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

    it("Shouldn't be able to create a new University without 'IES'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["IES"])
    })

    it("Shouldn't be able to create a new University without 'telephone'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                uf: "MG",
                email: "guilherme@gmail.br",
                password: "123",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["telephone"])
    })

    it("Shouldn't be able to create a new University without 'uf'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["uf"])
    })

    it("Shouldn't be able to create a new University without 'city'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["city"])
    })

    it("Shouldn't be able to create a new University without 'address'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["address"])
    })

    it("Shouldn't be able to create a new University without 'category'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["category"])
    })

    it("Should be able to create a new University without 'site'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

    it("Shouldn't be able to create a new University with incorrect UF", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MGA",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["uf"])
    })

    it("Shouldn't be able to create a new University with incorrect telephone", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789a",
                email: "guilherme@gmail.br",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "https://inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["telephone"])
    })

    it("Shouldn't be able to create a new University with incorrect site", async () => {
        const response = await request(app)
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
                site: "inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["site"])
    })
    
    it("Shouldn't be able to create a new University without 'email'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

    it("Shouldn't be able to create a new University with incorrect 'email'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme",
                password: "123",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

    it("Shouldn't be able to create a new University without 'password'", async () => {
        const response = await request(app)
            .post('/university')
            .send({
                IES: "Inatel",
                telephone: "34546789",
                email: "guilherme@gmail.br",
                uf: "MG",
                city: "Santa Rita",
                address: "Sei não",
                category: "privada",
                site: "inatel.br/home/"
            })

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["password"])
    })

})