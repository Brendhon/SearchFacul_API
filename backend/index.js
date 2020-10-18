// Escolhendo a porta que será utilizado no backend
PORT = 3333

// Importando o modulo express
const express = require('express')

// Criando aplicação 
const app = express()

// Ativando a utilização de JSON
app.use(express.json())

app.get('/', (req, resp) => {
    resp.send('hello')
})

app.post('/', (req, resp) => {
    resp.send(req.body)
})

// Escolhendo a porta
app.listen(PORT)