const express = require('express') // Importando o modulo express
const cors = require('cors')

const routes = require('./routes') //Importando as rotas

// Criando aplicação 
const app = express()

// Middleware
app.use(cors()) // Permitir que as aplicações frontend possam acessar a api
app.use(express.json()) // Ativando a utilização de JSON
app.use(routes) // Utilizando as rotas

// Escolhendo a porta
app.listen(3333)