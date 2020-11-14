//Importando a configuração de desenvolvimento
const connection = require('../database/connection')

const list = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Buscando lista de cursos referente a uma faculdade especifica 
    await connection('course')
        .where('university_id', university_id)
        .then(courses => response.json(courses))
        .catch(_ => response.status(500).json({ message: 'Falha no sistema' }))
}

module.exports = { list }