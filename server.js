const express = require('express')
const userRoutes = require('./src/routes/paciente-route')
const server = express()
const PORT = 3007

app.use(express.json());
app.use('pessoas', userRoutes)

server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`))