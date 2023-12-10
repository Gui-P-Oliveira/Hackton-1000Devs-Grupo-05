const express = require('express')
const vacinaAplicadaRoute = express.Router()
const {cadastraVacinasAplicada, pesquisaVacinasAplicada, deletaVacinasAplicadaId } = require('../controller/vacina-aplicadaController')

vacinaAplicadaRoute.post('/cadastrar', cadastraVacinasAplicada)
vacinaAplicadaRoute.get('/:id', pesquisaVacinasAplicada)
vacinaAplicadaRoute.delete('/:id', deletaVacinasAplicadaId)

module.exports = vacinaAplicadaRoute