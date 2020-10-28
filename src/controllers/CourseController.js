const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, email, description, duration, titration, modality, score } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    // Verificando se faculdade foi encontrada
    const university = await connection('university')
        .where('id', university_id)
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha ao servidor' }))

    if (!university) return response.status(400).json({ message: 'Universidade não encontrada :(' })

    // Realizando um destruction no array resultado da inserção para pegar o id gerado
    await connection('course')
        .insert({
            name,
            email,
            description,
            duration,
            titration,
            modality,
            score,
            university_id
        })
        .then(([id]) => response.json({ id })) // Retornando o ID como resposta 
        .catch(_ => response.status(500).json({ message: 'Falha ao criar' }))
}

const listByName = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { name } = request.params

    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    // Pegando o numero de cursos resultantes da busca
    const [count] = await connection('course')
        .where('name', 'like', `%${name}%`)
        .count()
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))

    // Buscando lista de cursos
    await connection('course')
        .join('university', 'university.id', '=', 'course.university_id') // Realizando um JOIN para pegar os dados da universidade
        .limit(numElements)
        .offset((page - 1) * numElements)
        .where('course.name', 'like', `%${name}%`)
        .select([
            'course.*', //Selecionando todos os dados dos cursos 
            'university.IES',
            'university.city',
            'university.telephone',
            'university.uf',
            'university.address',
            'university.category',
            'university.site'
        ])
        .then(courses => {
            response.header('X-Total-Count', count['count(*)'])
            return response.json(courses)
        })
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))

}

const listById = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { id } = request.params

    // Buscando lista de cursos
    await connection('course')
        .join('university', 'university.id', '=', 'course.university_id') // Realizando um JOIN para pegar os dados da universidade
        .where('course.id', id)
        .select([
            'course.*', //Selecionando todos os dados dos cursos 
            'university.IES',
            'university.city',
            'university.telephone',
            'university.uf',
            'university.address',
            'university.category',
            'university.site'
        ])
        .first() // Pegando o primeiro que ele encontrar
        .then(courses => response.json(courses))
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))

}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA O CURSO DE OUTRA)
    const universityId = await connection('course')
        .where('id', id)
        .select('university_id')
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha no Sistema' }))

    if (university_id != universityId) return response.status(401).json({ message: 'Operação não permitida' })

    await connection('course')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .delete() // Deletando o curso no banco
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar' }))

}

const update = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, email, description, duration, titration, modality, score } = request.body

    // Pegando o ID do curso que será atualizado
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const universityId = request.headers.authorization

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso
    const university_id = await connection('course')
        .where('university_id', universityId)
        .select('university_id')
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha no Sistema' }))

    if (university_id != universityId) return response.status(401).json({ message: 'Operação não permitida' })

    // Inserindo dados na tabela
    await connection('course')
        .where('id', id)
        .update({
            name,
            email,
            description,
            duration,
            titration,
            modality,
            score
        })
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao criar' }))

}

module.exports = { create, listByName, listById, remove, update }