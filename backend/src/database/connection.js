//Importando o Knex
const knex = require('knex')

//importando as configurações do arquivo knex e atribuindo a uma variável
const configuration = require('../../knexfile')

//Realizando a conexão no modo desenvolvimento
const connection = knex(configuration.development)


module.exports = connection