const crypto = require('crypto')
const connection = require('../database/connection')
const decrypt = require('../utils/decrypt')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { universityName, telephone, uf, city, street, number } = request.body

    // Gerando um id aleatório de 2 bytes no formato string
    const id = crypto.randomBytes(4).toString('HEX')

    // Inserindo dados na tabela
    await connection('university')
        .insert({
            id,
            universityName,
            telephone,
            uf,
            city,
            street,
            number
        })
        .then(_ => response.json({ id }))
        .catch(_ => response.status(400).json({ message: 'Falha ao criar' }))

}

const listByCity = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { city } = request.params

    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    // Pegando o numero de cursos resultantes da busca
    const [count] = await connection('university')
        .where('city', 'like', `%${city}%`)
        .count()
        .catch(_ => response.status(400).json({ message: 'Cidade não encontrada :(' }))

    await connection('university')
        .limit(numElements)
        .offset((page - 1) * numElements)
        .where('city', 'like', `%${city}%`)
        .then(universities => {
            response.header('X-Total-Count', count['count(*)'])
            return response.json(universities)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as universidades da cidade' }))

}

const listByName = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { name } = request.params

    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    // Pegando o numero de cursos resultantes da busca
    const [count] = await connection('university')
        .where('universityName', 'like', `%${name}%`)
        .count()
        .catch(_ => response.status(400).json({ message: 'Falha ao Buscar' }))

    await connection('university')
        .limit(numElements)
        .offset((page - 1) * numElements)
        .where('universityName', 'like', `%${name}%`)
        .then(universities => {
            response.header('X-Total-Count', count['count(*)'])
            return response.json(universities)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as Universidades' }))

}

const listCourses = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    let { id } = request.params

    // Descriptografando o ID
    id = decrypt(id)
    
    // Pegando o Curso escolhido pelo usuário 
    const { page = 1 } = request.query

    // Numero de elementos que serão retornados
    const numElements = 5

    // Pegando o numero de cursos resultantes da busca
    const [count] = await connection('course')
        .where('university_id', id)
        .count()
        .catch(_ => response.status(400).json({ message: 'Universidade não encontrado :(' }))

    // Buscando lista de cursos referente a uma faculdade especifica 
    await connection('course')
        .limit(numElements)
        .offset((page - 1) * numElements)
        .where('university_id', id)
        .select('*')
        .then(courses => {
            response.header('X-Total-Count', count['count(*)'])
            return response.json(courses)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as Universidades' }))

}

const remove = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const id = request.headers.authorization

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
    await connection('university')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .first() // Pegando o primeiro que ele encontrar
        .then(university => {
            if (id != university.id) return response.status(401).json({ message: 'Operação não permitida' })
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar' }))

    // Deletando os cursos relacionados a faculdade no banco
    await connection('course')
        .where('university_id', id)
        .delete()
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar cursos' }))

    // Deletando a universidade
    await connection('university')
        .where('id', id)
        .delete()
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar university' }))

}

module.exports = { create, listByName, listByCity, listCourses, remove }