const express = require('express')
const consultaVacinaRoute = express.Router()
const {
    consultaVacinaGeral1, 
    consultaVacinaPorIdade1, 
    consultaVacinaIntervaloIdade1,
    consultaVacinaPorMes,
    consultaVacinaPorIntervaloMes
} = require('../controller/consultaVacinaController')


consultaVacinaRoute.get('/geral', consultaVacinaGeral1)
consultaVacinaRoute.get('/idade', consultaVacinaPorIdade1)
consultaVacinaRoute.get('/intervalo-idade',consultaVacinaIntervaloIdade1)
consultaVacinaRoute.get('/mes', consultaVacinaPorMes)
consultaVacinaRoute.get('/intervalo-mes', consultaVacinaPorIntervaloMes)


module.exports = consultaVacinaRoute