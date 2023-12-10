const {cadastrarPaciente, atualizarPaciente, consultaPacientes, pesquisaPaciente} = require('../model/dbConfig.js')

const cadastrarPacientes = async (req, res) => {
    const {nome, dataNascimento} = req.body

    if (!nome || !dataNascimento) {
        return res.status(400).json("Parametro nome ou dataNascimento não foram inseridos")
        
    }

    const paciente = await cadastrarPaciente(nome, dataNascimento)

    res.status(201).json({
        message: 'Paciente Criado com Sucesso',
        data: paciente.rows
    });
}

const atualizarPacientes = async (req, res) => {
    const {nome, dataNascimento} = req.body
    const id = req.params.id    

    if (!nome || !dataNascimento || !id) {
        return res.status(400).json("Parametro nome, dataNascimento ou id não foram encontrados")        
    }

    const paciente = await atualizarPaciente(id, nome, dataNascimento)

    res.json({
        message: 'Paciente Atualizado com Sucesso',
        data: paciente.rows
    });
}

const listarPacientes = async (req, res) => {    
    const listaPacientes = await consultaPacientes()

    res.status(200).json(
        listaPacientes.rows
    );
}

const pesquisaPacienteId = async (req, res) => {
    const id = req.params.id    
    const paciente = await pesquisaPaciente(id)

    res.status(200).json(
        paciente.rows
    );
}

module.exports = {
    cadastrarPacientes,
    atualizarPacientes,
    listarPacientes,
    pesquisaPacienteId
}