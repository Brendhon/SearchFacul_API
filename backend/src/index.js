// Importando o modulo express
const express = require('express')
const routes = require('./routes') //Importando as rotas

// Criando aplicação 
const app = express()

// Middleware
app.use(express.json()) // Ativando a utilização de JSON
app.use(routes) // Utilizando as rotas

// Escolhendo a porta
app.listen(3333)