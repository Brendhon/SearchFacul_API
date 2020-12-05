const request = require('supertest')
const app = require('../../../src/app')
const connection = require('../../../src/database/connection')
const CONSTANTS = require('../../utils/constants')

describe("University", () => {

    // Atributos
    let universityExample

    // Antes de todos execute...
    beforeAll(async () => {
        await connection.migrate.rollback() // Realiza um rollback para evitar que o banco cresça sem controle
        await connection.migrate.latest() // Executa os migrates antes de dos testes serem chamados
    })

    // Antes de cada execute...
    beforeEach(() => {
        universityExample = Object.assign({}, CONSTANTS.universityExample) // Clonando o objetivo para não mexer na variável original
    })

    // Depois de todos execute...
    afterAll(async () => {
        await connection.destroy() // Apos TODOS os testes serem executados destrua a conexão
    })

    it("Should be able to create a new University", async () => {
        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new University without 'ies'", async () => {

        delete universityExample["ies"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["ies"])
    })

    it("Shouldn't be able to create a new University without 'telephone'", async () => {

        delete universityExample["telephone"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["telephone"])
    })

    it("Shouldn't be able to create a new University without 'email'", async () => {

        delete universityExample["email"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

    it("Shouldn't be able to create a new University without 'password'", async () => {
        
        delete universityExample["password"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["password"])
    })

    it("Shouldn't be able to create a new University without 'uf'", async () => {

        delete universityExample["uf"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["uf"])
    })

    it("Shouldn't be able to create a new University without 'city'", async () => {

        delete universityExample["city"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["city"])
    })

    it("Shouldn't be able to create a new University without 'address'", async () => {

        delete universityExample["address"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["address"])
    })

    it("Shouldn't be able to create a new University without 'category'", async () => {

        delete universityExample["category"]  // Removendo atributo desejado

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["category"])
    })

    it("Should be able to create a new University without 'site'", async () => {

        delete universityExample["site"]  // Removendo atributo desejado

        universityExample.email = "guilherme@hotmail.com" // Atribuindo um novo email para evitar colisão 

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body).toHaveProperty('id')
    })

    it("Shouldn't be able to create a new University with incorrect UF", async () => {

        universityExample.uf = "MGA"

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["uf"])
    })

    it("Shouldn't be able to create a new University with incorrect telephone", async () => {
        
        universityExample.telephone = "34546789a"

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["telephone"])
    })

    it("Shouldn't be able to create a new University with incorrect site", async () => {

        universityExample.site = "inatel.br/home/"

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["site"])
    })

    it("Shouldn't be able to create a new University with incorrect 'email'", async () => {
        
        universityExample.email = "guilherme"

        const response = await request(app)
            .post('/university')
            .send(universityExample)

        expect(response.body.statusCode).toBe(400)
        expect(response.body.validation.body.keys).toEqual(["email"])
    })

})