//Importando a configuração de desenvolvimento
const connection = require('../database/connection')
const CONSTANTS = require('../utils/constants')

const list = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Buscando lista de cursos
    await connection('v_course')
        .where('university_id', university_id)
        .then(courses => {
            response.header('X-Total-Count', courses.length)
            return response.json(courses)
        })
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))
}

module.exports = { list }