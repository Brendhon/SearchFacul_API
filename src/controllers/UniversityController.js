const connection = require('../database/connection')
const { encryptPassword } = require('../utils/auth')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { IES, telephone, uf, city, email, password, address, category, site } = request.body

    // Criando um Hash da senha para ser salvo no Banco
    const hash = await encryptPassword(password)

    // Inserindo dados na tabela
    await connection('university')
        .insert({
            IES,
            telephone,
            email,
            password: hash, // Salvando o hash da senha
            uf,
            city,
            address,
            category,
            site
        })
        .then(([id]) => response.json({ id })) // Retornando o ID como resposta 
        .catch(_ => response.status(400).json({ message: 'Falha ao criar' }))

}

const listByCity = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { city } = request.params

    await connection('university')
        .where('city', 'like', `%${city}%`)
        .select([
            'university.id',
            'university.IES',
            'university.email',
            'university.city',
            'university.telephone',
            'university.uf',
            'university.address',
            'university.category',
            'university.site'
        ])
        .then(universities => {
            response.header('X-Total-Count', universities.length) // Pegando o numero de universidades resultantes da busca
            return response.json(universities)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as universidades da cidade' }))

}

const listByName = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { name } = request.params

    await connection('university')
        .where('IES', 'like', `%${name}%`)
        .select([
            'university.id',
            'university.IES',
            'university.email',
            'university.city',
            'university.telephone',
            'university.uf',
            'university.address',
            'university.category',
            'university.site'
        ])
        .then(universities => {
            response.header('X-Total-Count', universities.length)
            return response.json(universities)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as Universidades' }))

}

const listCourses = async (request, response) => {

    // Pegando o Curso escolhido pelo usuário 
    const { id } = request.params

    // Buscando lista de cursos referente a uma faculdade especifica 
    await connection('course')
        .where('university_id', id)
        .then(courses => {
            response.header('X-Total-Count', courses.length) // Passando o total de elementos
            return response.json(courses)
        })
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar as Universidades' }))

}

const remove = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
    const university = await connection('university')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .select('id')
        .first() // Pegando o primeiro que ele encontrar
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar' }))

    if (!university || id != university.id) return response.status(401).json({ message: 'Operação não permitida' })

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

const update = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    let { IES, telephone, uf, city, address, email, password, category, site } = request.body

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const { id } = request

    // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
    const university = await connection('university')
        .where('id', id)  // Comparando o ID escolhido com o do banco
        .select("id")
        .first() // Pegando o primeiro que ele encontrar
        .catch(_ => response.status(400).json({ message: 'Falha ao buscar' }))

    if (!university || id != university.id) return response.status(401).json({ message: 'Operação não permitida' })

    if (password) password = encryptPassword(password)

    // Inserindo dados na tabela
    await connection('university')
        .where('id', id)
        .update({
            IES,
            telephone,
            email,
            password,
            uf,
            city,
            address,
            category,
            site
        })
        .then(_ => response.status(204).send())
        .catch(_ => response.status(400).json({ message: 'Falha ao criar' }))

}

module.exports = { create, listByName, listByCity, listCourses, remove, update }