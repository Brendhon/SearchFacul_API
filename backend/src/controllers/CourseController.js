const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, email, description, score } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

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

        return response.status(500).json({ message: 'Falha ao criar' })

    }
}

const list = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { name } = request.params

    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    try {

        // Pegando o numero de cursos resultantes da busca
        const [count] = await connection('course')
            .where('name', 'like', `%${name}%`)
            .count()

        response.header('X-Total-Count', count['count(*)'])

    } catch {
        return response.status(400).json({ message: 'Curso não encontrado :(' })
    }

    try {
        // Buscando lista de cursos
        const courses = await connection('course')
            .join('university', 'university.id', '=', 'course.university_id') // Realizando um JOIN para pegar os dados da universidade
            .limit(numElements)
            .offset((page - 1) * numElements)
            .where('course.name', 'like', `%${name}%`)
            .select([
                'course.*', //Selecionando todos os dados dos cursos 
                'university.universityName',
                'university.city',
                'university.telephone',
                'university.uf',
                'university.street',
                'university.number'
            ])

        return response.json(courses)

    } catch {
        return response.status(400).json({ message: 'Curso não encontrado' })
    }
}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    try {

        const courses = await connection('course')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .select('university_id') // Pegando o ID da universidade responsável
            .first() // Pegando o primeiro que ele encontrar

        // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA O CURSO DE OUTRA)
        if (university_id != courses.university_id) return response.status(401).json({ message: 'Operação não permitida' })

    } catch {

        return response.status(400).json({ message: 'Falha ao buscar' })

    }

    try {

        await connection('course')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .delete() // Deletando o curso no banco

        return response.status(204).send()

    } catch {

        return response.status(500).json({ message: 'Falha ao deletar' })

    }
}

module.exports = { create, list, remove }