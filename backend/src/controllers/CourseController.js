const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { name, email, description, score } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

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
}

const list = async (request, response) => {
    const courses = await connection('course').select('*')
    return response.json(courses)
}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const university_id = request.headers.authorization

    const courses = await connection('course')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .select('university_id') // Pegando o ID da universidade responsável
        .first() // Pegando o primeiro que ele encontrar

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA O CURSO DE OUTRA)
    if (university_id != courses.university_id) {
        return response.status(401).json({ error: 'Operação não permitida' })
    }

    await connection('course')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .delete() // Deletando o curso no banco

    return response.status(204).send()
}

module.exports = { create, list, remove }