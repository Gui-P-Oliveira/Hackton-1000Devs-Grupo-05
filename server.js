const express = require('express')
const pacienteRoute = require('./src/routes/paciente-route')
const vacinaAplicadaRoute = require('./src/routes/vacina-aplicada-route')
const server = express()
const PORT = 3007
server.use(express.json());
server.use('/pessoas', pacienteRoute)
server.use('/vacina-aplicada', vacinaAplicadaRoute)

server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`))