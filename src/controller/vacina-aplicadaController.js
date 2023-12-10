const {excluiVacinaAplicada, pesquisaVacinaAplicada, inseriVacinaAplicada} = require('../model/dbConfig.js')

//Cadastro de vacina aplicada de uma determinada pessoa
const cadastraVacinasAplicada = async (req, res) => {
    const {idPaciente, idVacina, dataAplicacao} = req.body

    if (!dataAplicacao || !idVacina || !idPaciente ) {
        return res.status(400).json("Parametro id da vacina, id do paciente ou data de aplicação não foram inseridos")
        
    }

    const vacinaAplicada = await inseriVacinaAplicada(idPaciente, idVacina, dataAplicacao)

    res.status(201).json({
        message: 'Vacina cadastrada com sucesso',
        data: vacinaAplicada.rows
    });
}

//pesquisar as vacinas de uma determinada pessoa
const pesquisaVacinasAplicada = async (req, res) => {
    const idPaciente = req.params.id

    const pesquisaVacinas = await pesquisaVacinaAplicada(idPaciente)

    res.status(200).json({
        message: 'Vacinas aplicadas: ',
        data: pesquisaVacinas.rows
    });
}

//deletar uma vacina de uam determinada pessoa
const deletaVacinasAplicadaId = async (req, res) => {
    const {idPaciente, idVacina} = req.body

    const excluiVacinasAplicada = await excluiVacinaAplicada(idPaciente, idVacina)

    res.status(201).json({
        message: 'Vacina excluída com sucesso',
        data: excluiVacinasAplicada.rows
    })
}

module.exports = {deletaVacinasAplicadaId, pesquisaVacinasAplicada, cadastraVacinasAplicada}