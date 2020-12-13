const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { courseAttributes } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se faculdade foi encontrada
    const university = await connection('university')
        .where('id', university_id)
        .first()
        .catch(_ => response.status(500).json({ message: 'Falha ao servidor' }))

    if (!university) return response.status(400).json({ message: 'Universidade não encontrada :(' })

    // Inserindo os dodos
    await connection('course')
        .insert({
            ...courseAttributes,
            university_id
        })
        .then(_ => response.status(204).send()) // Retornando o ID como resposta 
        .catch(_ => response.status(500).json({ message: 'Falha ao criar' }))
}


const list = async (request, response) => {

    // Pegando a opção escolhida pelo usuário 
    const { option } = request.params

    const { text } = request.query

    // Buscando lista de cursos
    await connection('v_course')
        .whereRaw('LOWER(REMOVE_ACCENTUATION(??)) LIKE LOWER(REMOVE_ACCENTUATION(?))', [option, `%${text}%`])
        .then(courses => {
            response.header('X-Total-Count', courses.length)
            return response.json(courses)
        })
        .catch(err => response.status(400).json(err))

}

const remove = async (request, response) => {

    // Pegando o ID escolhido pelo usuário 
    const { id } = request.params

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso
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
    const { courseAttributes } = request.body

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
        .update(courseAttributes)
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao criar' }))

}

module.exports = {
    create,
    list,
    remove,
    update
}