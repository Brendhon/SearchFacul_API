const connection = require('../database/connection')
const { encryptPassword } = require('../utils/auth')
const CONSTANTS = require('../utils/constants')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { universityAttributes } = request.body

    // Criando um Hash da senha para ser salvo no Banco
    universityAttributes.password = await encryptPassword(universityAttributes.password)

    // Verificando se já existe uma universidade cadastrada neste email 
    const university = await connection('university')
        .where('email', universityAttributes.email)
        .first()
        .catch(_ => response.status(400).json({ message: 'Erro no Banco' }))

    // Verifica se o email já esta cadastrado
    if (university) return response.status(400).json({ message: 'Email já cadastrado no sistema' })

    // Inserindo dados na tabela
    await connection('university')
        .insert(universityAttributes)
        .then(_ => response.status(204).send()) // Retornando o ID como resposta 
        .catch(_ => response.status(400).json({ message: 'Falha ao criar' }))

}

const list = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { university_id } = request

    // Buscando lista de cursos referente a uma faculdade especifica 
    await connection('university')
        .where('id', university_id)
        .select(CONSTANTS.universityData)
        .first()
        .then(data => {
            return response.json(data)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar dados da universidade' }))

}

const remove = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
    const university = await connection('university')
        .where('id', university_id)  // Comparando o ID escolhido com o do banco
        .select('id')
        .first() // Pegando o primeiro que ele encontrar
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar' }))

    if (!university || university_id != university.id) return response.status(401).json({ message: 'Operação não permitida' })

    // Deletando os cursos relacionados a faculdade no banco
    await connection('course')
        .where('university_id', university_id)
        .delete()
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar cursos' }))

    // Deletando a universidade
    await connection('university')
        .where('id', university_id)
        .delete()
        .then(_ => response.status(204).send())
        .catch(_ => response.status(500).json({ message: 'Falha ao deletar university' }))

}

const update = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { universityAttributes } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { university_id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
    const university = await connection('university')
        .where('id', university_id)  // Comparando o ID escolhido com o do banco
        .select("id")
        .first() // Pegando o primeiro que ele encontrar
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar' }))

    if (!university || university_id != university.id) return response.status(401).json({ message: 'Operação não permitida' })

    if (universityAttributes.password) universityAttributes.password = await encryptPassword(universityAttributes.password)

    // Inserindo dados na tabela
    await connection('university')
        .where('id', university_id)
        .update(universityAttributes)
        .then(_ => response.status(204).send())
        .catch(_ => response.status(400).json({ message: 'Falha ao Editar!! É possível que este email já esteja sendo utilizado!' }))

}

module.exports = { create, list, remove, update }