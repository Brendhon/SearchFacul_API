//Importando a configuração de desenvolvimento
const connection = require('../database/connection')

const list = async (request, response) => {
    
    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    try {

        // Buscando lista de cursos referente a uma faculdade especifica 
        const courses = await connection('course') 
            .where('university_id', university_id)
            .select('*')

        return response.json(courses)

    } catch {

        return response.status(400).json({ message: 'Falha ao buscar' })

    }
}

module.exports = { list }