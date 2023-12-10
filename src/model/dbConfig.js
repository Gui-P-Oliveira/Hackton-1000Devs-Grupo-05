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

//Cadastra Pacientes
const cadastrarPaciente = async (nome, dataNascimento) => {
    const result = await pool.query('INSERT INTO PACIENTE (id_paciente, nome, Data_nascimento) VALUES ((SELECT COALESCE(MAX(id_paciente), 0) + 1 FROM PACIENTE), $1, $2) RETURNING *', [nome, dataNascimento]);
    return result
}
//Consulta Paciente
const consultaPacientes = async () => {
    const result = await pool.query('SELECT * from PACIENTE');
    return result
}
//Atualiza Paceiente 
const atualizarPaciente = async (idPaciente, novoNome, novaDataNascimento) => {
    const result = await pool.query('UPDATE PACIENTE SET nome = $2, Data_nascimento = $3 WHERE id_paciente = $1 RETURNING *', [idPaciente, novoNome, novaDataNascimento]);
    return result
}

//Consulta paciente por ID
const pesquisaPaciente = async (id_paciente) => {
    const result = await pool.query('SELECT * from PACIENTE WHERE id_paciente = $1', [id_paciente]);
    return result
}

const inseriVacinaAplicada = async (idPaciente, Idvacina, dataAplicacao) => {    
    const result = await pool.query('INSERT INTO VACINAAPLICADA (id_paciente, Id_vacina, Data_aplicacao) VALUES ($1, $2, $3) RETURNING *', [idPaciente, Idvacina, dataAplicacao]);
    return result
}

const excluiVacinaAplicada = async (idPaciente, Idvacina) => {    
    const result = await pool.query
        ('DELETE FROM VACINAAPLICADA WHERE id_paciente = $1 AND id_vacina = $2', 
            [idPaciente, Idvacina]);
    return result
}

const pesquisaVacinaAplicada = async (idPaciente) => {
    const result = await pool.query('SELECT * FROM VACINAAPLICADA WHERE id_paciente = $1', [idPaciente]);
    return result
}

//Consulta em mais de uam Tabela, para retornar dados especificos
const consultaVacinaPersonalizada = async () => {
    const result = await pool.query('SELECT * FROM VACINA, PERIODOAPLICACAOMES, PERIODOAPLICACAOANO,REDE');
    return result.rows;
}

//Pesquisa na tabela de resgistro de aplicações por ANO
const mostraPeriodoAplicacaoAno = async () => {
    const result = await pool.query('SELECT * FROM PERIODOAPLICACAOANO');
    return result.rows;
}

//Consulta por Ano Exato
const consultaIdadePacientesPorAno = async (idade) => {
    const results = await pool.query(`
    SELECT VACINA.Vacina, VACINA.Sigla_vacina
    FROM VACINA
    JOIN PERIODOAPLICACAOANO ON VACINA.Id_vacina = PERIODOAPLICACAOANO.Id_vacina
    WHERE ${idade} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final;
  `);
    
  return results.rows; 
};

//Consulta por intervalo em ANO
const consultaVacinasPorIntervaloDeIdade = async (idadeInicial, idadeanoFinal) => {

    const results = await pool.query(`
        SELECT VACINA.Vacina, VACINA.Sigla_vacina
        FROM VACINA
        JOIN PERIODOAPLICACAOANO ON VACINA.Id_vacina = PERIODOAPLICACAOANO.Id_vacina
        WHERE ${idadeInicial} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final
        OR ${idadeanoFinal} BETWEEN PERIODOAPLICACAOANO.Qtd_ano_inicial AND PERIODOAPLICACAOANO.Qtd_ano_final
        OR (PERIODOAPLICACAOANO.Qtd_ano_inicial BETWEEN ${idadeInicial} AND ${idadeanoFinal})
        OR (PERIODOAPLICACAOANO.Qtd_ano_final BETWEEN ${idadeInicial} AND ${idadeanoFinal});
    `);

   return results.rows 
};

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

    return results.rows;
};

//Consulta por Mês Exato
const consultaIdadePacientesPorMes = async (mesEspecifico) => {
    const results = await pool.query(`
    SELECT VACINA.Vacina, VACINA.Sigla_vacina
    FROM VACINA
    JOIN PERIODOAPLICACAOMES ON VACINA.Id_vacina = PERIODOAPLICACAOMES.Id_vacina
    WHERE ${mesEspecifico} BETWEEN PERIODOAPLICACAOMES.Qtd_meses_inicial AND PERIODOAPLICACAOMES.Qtd_meses_final;
  `);

    return results.rows; 
};

module.exports = {
    cadastrarPaciente,
    atualizarPaciente,
    consultaPacientes,
    pesquisaPaciente,
    inseriVacinaAplicada,
    excluiVacinaAplicada,
    pesquisaVacinaAplicada,
    consultaVacinaPersonalizada,
    mostraPeriodoAplicacaoAno,
    consultaIdadePacientesPorAno,
    consultaVacinasPorIntervaloDeIdade,
    consultaVacinasPorIntervaloDeMeses,
    consultaIdadePacientesPorMes
}


