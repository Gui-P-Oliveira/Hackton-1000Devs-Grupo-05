const express = require('express')
const server = express()
const PORT = 3007

server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`))