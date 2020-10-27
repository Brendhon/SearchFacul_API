const generateUniqueId = require('../../src/utils/generateUniqueId')

describe("Generate Unique ID", () => {
    
    // Atributos
    let id

    // Métodos
    beforeEach(() => {
        id = generateUniqueId()
    })

    it("Should generate an unique ID", () => {
        expect(id).toHaveLength(8)
    })

    it("Should be Hex", () => {
        /[a-f0-9]/i.test(id)
    })


})
