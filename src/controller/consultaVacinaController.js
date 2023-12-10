const { 
    consultaVacinaPersonalizada,
    consultaIdadePacientesPorAno, 
    consultaVacinasPorIntervaloDeIdade,
    consultaIdadePacientesPorMes,
    consultaVacinasPorIntervaloDeMeses
} = require('../model/dbConfig')

const consultaVacinaGeral1 = async (req, res) => {

    const dadosVacinas = await consultaVacinaPersonalizada()

    res.status(200).json({
        data: dadosVacinas
    });
}

const consultaVacinaPorIdade1 = async (req, res) => {
    const { idade } = req.body
    const dadosVacinasPorIdade = await consultaIdadePacientesPorAno(idade)

    res.status(200).json({
        data: dadosVacinasPorIdade
    });
}

const consultaVacinaIntervaloIdade1 = async (req, res) => {
    const { idadeInicial, idadeFinal } = req.body
    const dadosVacinasPorIdade = await consultaVacinasPorIntervaloDeIdade(idadeInicial, idadeFinal)

    res.status(200).json({
        data: dadosVacinasPorIdade
    });
}

const consultaVacinaPorMes = async (req, res) => {
    const { mes } = req.body
    const dadosVacinasPorIdade = await consultaIdadePacientesPorMes(mes)

    res.status(200).json({
        data: dadosVacinasPorIdade
    });
}
const consultaVacinaPorIntervaloMes = async (req, res) => {
    const { mesInicial, mesFinal } = req.body
    const dadosVacinasPorIdade = await consultaVacinasPorIntervaloDeMeses(mesInicial, mesFinal)

    res.status(200).json({
        data: dadosVacinasPorIdade
    });
}

module.exports = {
    consultaVacinaGeral1,
    consultaVacinaPorIdade1,
    consultaVacinaIntervaloIdade1,
    consultaVacinaPorMes,
    consultaVacinaPorIntervaloMes
}