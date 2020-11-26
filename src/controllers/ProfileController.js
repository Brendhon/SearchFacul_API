//Importando a configuração de desenvolvimento
const connection = require('../database/connection')
const CONSTANTS = require('../utils/constants')

const list = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Buscando lista de cursos
    await connection('course')
        .join('university', 'university.id', '=', 'course.university_id') // Realizando um JOIN para pegar os dados da universidade
        .where('university.id', university_id)
        .select(CONSTANTS.universityAndCourseData)
        .then(courses => {
            response.header('X-Total-Count', courses.length)
            return response.json(courses)
        })
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))
}

module.exports = { list }