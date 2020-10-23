const crypto = require('crypto')
const connection = require('../database/connection')

const create = async (request, response) => {

    // Realizando um destruction no objeto vindo da requisição
    const { universityName, telephone, uf, city, street, number } = request.body

    // Gerando um id aleatório de 2 bytes no formato string
    const id = crypto.randomBytes(2).toString('HEX')

    try {

        // Inserindo dados na tabela
        await connection('university').insert({
            id,
            universityName,
            telephone,
            uf,
            city,
            street,
            number
        })

        // Retornando o ID como resposta 
        return response.json({ id })

    } catch {
        return response.status(400).json({ message: 'Falha ao criar' })
    }
}

const list = async (request, response) => {
    try {
        const universities = await connection('university').select('*')
        return response.json(universities)
    } catch {
        return response.status(400).json({ message: 'Falha ao buscar as Universidades' })
    }
}

const remove = async (request, response) => {

    // Utilizando o cabeçalho da requisição para verificar quem é o responsável por esse curso
    const id = request.headers.authorization

    try {

        const university = await connection('university')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .first() // Pegando o primeiro que ele encontrar

        // Verificando se o ID da requisição é o mesmo ID do responsável pelo curso (EVITAR QUE UMA UNIVERSIDADE EXCLUA A OUTRA)
        if (id != university.id) return response.status(401).json({ message: 'Operação não permitida' })

    } catch {

        return response.status(400).json({ message: 'Falha ao buscar' })

    }

    try {

        await connection('university')
            .where('id', id)  // Comparando o ID escolhido com o do banco
            .delete() // Deletando o curso no banco

        return response.status(204).send()

    } catch {

        return response.status(500).json({ message: 'Falha ao deletar' })

    }
}

module.exports = { create, list, remove }