//Importando a configuração de desenvolvimento
const connection = require('../database/connection')

const list = async (request, response) => {
    
    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization
    
    // Verificando integridade dos dados
    if (!university_id) return response.status(401).json({ error: 'Não autorizado' })

    try {

        // Buscando lista de cursos referente a uma faculdade especifica 
        const courses = await connection('course') 
            .where('university_id', university_id)
            .select('*')

        return response.json(courses)

    } catch {

        return response.status(500).json({ error: 'Falha ao buscar' })

    }
}

module.exports = { list }