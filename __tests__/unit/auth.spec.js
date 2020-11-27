const { encryptPassword, comparePassword  } = require('../../src/utils/auth')

describe("Auth", () => {

    // Atributos
    let password
    let samePassword

    // Antes de todos execute...
    beforeAll(async () => {
        password = await encryptPassword("123")
        samePassword = false
    })

    it("Should be able to recognize a password", async () => {

        samePassword = await comparePassword("123", password)

        expect(samePassword).toBeTruthy()
    })

    it("Shouldn't be able to recognize a password", async () => {

        samePassword = await comparePassword("1234", password)

        expect(samePassword).toBeFalsy();
    })
})