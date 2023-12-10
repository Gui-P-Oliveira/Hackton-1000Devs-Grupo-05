const express = require('express')
const pacienteRoute = express.Router()
const {cadastrarPacientes, atualizarPacientes, listarPacientes, pesquisaPacienteId} = require('../controller/pacienteController')

pacienteRoute.post('/cadastrar', cadastrarPacientes)
pacienteRoute.put('/atualizar/:id', atualizarPacientes)
pacienteRoute.get('/lista', listarPacientes)
pacienteRoute.get('/:id', pesquisaPacienteId)

module.exports = pacienteRoute