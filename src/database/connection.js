// Importando o Knex
const knex = require('knex')

// Importando as configurações do arquivo knex e atribuindo a uma variável
const configuration = require('../../knexfile')

// Pegando a variável ambiente criada pelo cross-env
const env = process.env.NODE_ENV 

// Verificando se a variável ambiente esta no modo teste ou desenvolvedor
const config = env == 'test' ? configuration.test : configuration.development

// Realizando a conexão no modo desenvolvimento
const connection = knex(config)

// Executando o comando de rodar as migrations pelo código
connection.migrate.latest([config]) 

module.exports = connection