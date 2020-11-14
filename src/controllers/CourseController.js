const connection = require('../database/connection')
const CONSTANTS = require('../utils/constants')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, description, duration, titration, modality, score } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

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

    // Buscando lista de cursos
    await connection('course')
        .join('university', 'university.id', '=', 'course.university_id') // Realizando um JOIN para pegar os dados da universidade
        .where('course.name', 'like', `%${name}%`)
        .select(CONSTANTS.universityAndCourseData)
        .then(courses => {
            response.header('X-Total-Count', courses.length)
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
        .select(CONSTANTS.universityAndCourseData)
        .first() // Pegando o primeiro que ele encontrar
        .then(courses => response.json(courses))
        .catch(_ => response.status(500).json({ message: 'Erro no sistema' }))

}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA O CURSO DE OUTRA)
    const course = await connection('course')
        .where('id', id)
        .select('university_id')
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha no Sistema' }))

    if (!course || university_id != course.university_id) return response.status(401).json({ message: 'Operação não permitida' })

    await connection('course')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .delete() // Deletando o curso no banco
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar' }))

}

const update = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, description, duration, titration, modality, score } = request.body

    // Pegando o ID do curso que será atualizado
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso
    const course = await connection('course')
        .where('university_id', university_id)
        .select('university_id')
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha no Sistema' }))

    if (!course || course.university_id != university_id) return response.status(401).json({ message: 'Operação não permitida' })

    // Inserindo dados na tabela
    await connection('course')
        .where('id', id)
        .update({
            name,
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