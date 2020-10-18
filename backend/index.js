// Escolhendo a porta que será utilizado no backend
PORT = 3333

// Importando o modulo express
const express = require('express')

// Criando aplicação 
const app = express()

app.get('/', (req, resp) => {
    resp.send('hello')
})

// Escolhendo a porta
app.listen(PORT)