const encrypt = require('../utils/encrypt')
const decrypt = require('../../src/utils/decrypt')

describe("Generate Unique ID", () => {

    // Atributos
    let id

    // Métodos
    beforeEach(() => {
        id = encrypt("beh")
    })

    it("Should decrypt an ID", () => {

        id = decrypt(id) // Realizando a descriptografia 

        expect(id).toBe("beh")

    })

})