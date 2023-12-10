const { Pool } = require('pg');

const pool = new Pool({
    user: 'sigrid',
    host: 'itcpostgresql.postgres.database.azure.com',
    database: 'db005',
    password: '%&unsas_aew27005',
    port: 5432,
    ssl: true
});
//Buscar as vascians
const showVacinasCount = async () => {
    const result = await pool.query('SELECT * from VACINA');
    console.log(result.rows);
}
//Cadastra Pacientes
const cadastrarPaciente = async (nome, dataNascimento) => {
    const result = await pool.query('INSERT INTO PACIENTE (id_paciente, nome, Data_nascimento) VALUES ((SELECT COALESCE(MAX(id_paciente), 0) + 1 FROM PACIENTE), $1, $2) RETURNING *', [nome, dataNascimento]);
}
//Atualiza Paceiente 
const atualizarPaciente = async (idPaciente, novoNome, novaDataNascimento) => {
    const result = await pool.query('UPDATE PACIENTE SET nome = $2, Data_nascimento = $3 WHERE id_paciente = $1 RETURNING *', [idPaciente, novoNome, novaDataNascimento]);
}
//Consulta paciente por ID
const pesquisaPacienteId = async (idPaciente) => {
    const result = await pool.query('SELECT * from PACIENTE WHERE id_paciente = $1', [idPaciente]);
    console.log(result.rows);
}
//Cadastrar rede
const cadastrarIdRede = async (tipoRede) => {
    const result = await pool.query('INSERT INTO REDE (Id_rede, Tipo_rede) VALUES ((SELECT COALESCE(MAX(Id_rede), 0) + 1 FROM REDE), $1) RETURNING *', [tipoRede]);
}
//Consulta rede
const consultaRede = async () => {
    const result = await pool.query('SELECT * from REDE');
    console.log(result.rows);
}
//Vacinas
const inseriVacinaAplicada = async (idPaciente, Idvacina, dataAplicacao) => {
    const result = await pool.query('INSERT INTO VACINAAPLICADA (id_paciente, Id_vacina, Data_aplicacao) VALUES ($1, $2, $3) RETURNING *', [idPaciente, Idvacina, dataAplicacao]);
    return result
}
//Pesquisa vacinas por
const pesquisaVacinaAplicada = async (idPaciente, Idvacina) => {
    const result = await pool.query('SELECT * FROM VACINAAPLICADA WHERE id_paciente = $1 AND id_vacina = $2 ', [idPaciente, Idvacina]);
    console.log(result.rows);
}

//Consulta em mais de uam Tabela, para retornar dados especificos
const consultaVacinaPersonalizada = async () => {
    const result = await pool.query('SELECT * FROM VACINA, PERIODOAPLICACAOMES, PERIODOAPLICACAOANO,REDE');
    return result.rows;
}

//Pesquisa na tabela de resgistro de aplicações por ANO
const mostraPeriodoAplicacaoAno = async () => {
    const result = await pool.query('SELECT * FROM PERIODOAPLICACAOANO');
    console.log(result.rows);
}

//Consulta por Ano Exato
const consultaIdadePacientesPorAno = async (anoEspecifico) => {
    const results = await pool.query(`
    SELECT VACINA.Vacina, VACINA.Sigla_vacina
    FROM VACINA
    JOIN PERIODOAPLICACAOANO ON VACINA.Id_vacina = PERIODOAPLICACAOANO.Id_vacina
    WHERE ${anoEspecifico} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final;
  `);
    // Executa a consulta
    console.log('Vacinas aplicadas no ano:', anoEspecifico);
    console.log(results.rows); // Resultado da consulta
};

//Consulta por intervalo em ANO
const consultaVacinasPorIntervaloDeAnos = async (anoInicial, anoFinal) => {

    const results = await pool.query(`
            SELECT VACINA.Vacina, VACINA.Sigla_vacina
            FROM VACINA
            JOIN PERIODOAPLICACAOANO ON VACINA.Id_vacina = PERIODOAPLICACAOANO.Id_vacina
            WHERE ${anoInicial} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final
            OR ${anoFinal} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final
            OR (PERIODOAPLICACAOANO.Qtd_ano_inicial BETWEEN ${anoInicial} AND ${anoFinal})
            OR (PERIODOAPLICACAOANO.Qtd_ano_final BETWEEN ${anoInicial} AND ${anoFinal});
        `);

    console.log(`Vacinas aplicadas entre os anos ${anoInicial} e ${anoFinal}:`);
    console.log(results.rows); // Resultado da consulta

};


//Consulta vacina Por Mês 
const mostraPeriodoAplicacaoMes = async () => {
    const result = await pool.query('SELECT * FROM PERIODOAPLICACAOMES, VACINA');
    console.log(result.rows);
}
//Consulta por intervalo de MÊs
const consultaVacinasPorIntervaloDeMeses = async (mesInicial, mesFinal) => {

    const results = await pool.query(`
            SELECT V.Vacina, V.Sigla_vacina
            FROM VACINA V
            JOIN PERIODOAPLICACAOMES PM ON V.Id_vacina = PM.Id_vacina
            WHERE ${mesInicial} BETWEEN PM.Qtd_meses_inicial AND PM.Qtd_meses_final
            OR ${mesFinal} BETWEEN PM.Qtd_meses_inicial AND PM.Qtd_meses_final
            OR (PM.Qtd_meses_inicial BETWEEN ${mesInicial} AND ${mesFinal})
            OR (PM.Qtd_meses_final BETWEEN ${mesInicial} AND ${mesFinal});
        `);

    console.log(`Vacinas aplicadas entre os meses ${mesInicial} e ${mesFinal}:`);
    console.log(results.rows); // Resultado da consulta

};

//Consulta por Mês Exato
const consultaIdadePacientesPorMes = async (mesEspecifico) => {
    const results = await pool.query(`
    SELECT VACINA.Vacina, VACINA.Sigla_vacina
    FROM VACINA
    JOIN PERIODOAPLICACAOMES ON VACINA.Id_vacina = PERIODOAPLICACAOMES.Id_vacina
    WHERE ${mesEspecifico} BETWEEN PERIODOAPLICACAOMES.Qtd_meses_inicial AND PERIODOAPLICACAOMES.Qtd_meses_final;
  `);
    // Executa a consulta
    console.log('Vacinas aplicadas no primeiro Mês:', mesEspecifico);
    console.log(results.rows); // Resultado da consulta
};

//consultaIdadePacientesPorAno(10)
//consultaVacinasPorIntervaloDeAnos(3, 5)
//consultaVacinasPorIntervaloDeMeses(0, 1)
consultaIdadePacientesPorMes(0)

//mostraPeriodoAplicacaoMes()

module.exports = {
    cadastrarPaciente,
    atualizarPaciente,
    pesquisaPacienteId

}


