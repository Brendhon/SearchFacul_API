const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, email, description, score } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    // Verificando integridade dos dados
    if (!name) return response.status(400).json({ error: 'Nome inválido' })
    if (!email) return response.status(400).json({ error: 'Email inválido' })
    if (!description) return response.status(400).json({ error: 'Descrição inválida' })
    if (!(score > 1 && score <= 5)) return response.status(400).json({ error: 'Pontuação inválida' })
    if (!university_id) return response.status(401).json({ error: 'Não autorizado' })

    try {

        // Realizando um destruction no array resultado da inserção para pegar o id gerado
        const [id] = await connection('course').insert({
            name,
            email,
            description,
            score,
            university_id
        })

        // Retornando o ID como resposta 
        return response.json({ id })

    } catch {

        return response.status(500).json({ error: 'Falha ao criar' })

    }
}

const list = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { name } = request.params

    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    // Verificando integridade dos dados
    if (!name) return response.status(400).json({ error: 'Necessita do nome do curso desejado' })
    if (!page) return response.status(400).json({ error: 'Pagina fora do limite' })

    try {

        // Pegando o numero de cursos resultantes da busca
        const [count] = await connection('course')
            .where('name', 'like', `%${name}%`)
            .count()
        

        response.header('X-Total-Count', count['count(*)'])
        
    } catch {
        return response.status(500).json({ error: 'Curso não encontrado' })
    }
    
    try {
        // Buscando lista de cursos
        const courses = await connection('course')
            .limit(numElements)
            .offset((page - 1) * numElements)
            .where('name', 'like', `%${name}%`)
            .select('*')

        return response.json(courses)

    } catch {
        return response.status(500).json({ error: 'Curso não encontrado' })
    }
}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    // Verificando integridade dos dados
    if (!id) return response.status(400).json({ error: 'Necessita de um ID' })
    if (!university_id) return response.status(401).json({ error: 'Não autorizado' })

    try {

        const courses = await connection('course')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .select('university_id') // Pegando o ID da universidade responsável
            .first() // Pegando o primeiro que ele encontrar

        // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA O CURSO DE OUTRA)
        if (university_id != courses.university_id) return response.status(401).json({ error: 'Operação não permitida' })

    } catch {

        return response.status(500).json({ error: 'Falha ao buscar' })

    }

    try {

        await connection('course')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .delete() // Deletando o curso no banco

        return response.status(204).send()

    } catch {

        return response.status(500).json({ error: 'Falha ao deletar' })

    }
}

module.exports = { create, list, remove }