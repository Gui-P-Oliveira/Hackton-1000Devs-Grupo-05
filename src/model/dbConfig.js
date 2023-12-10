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
    const result = await pool.query('SELECT * FROM VACINA, PERIODOAPLICACAOMES, PERIODOAPLICACAOANO, REDE');
    console.log(result.rows);
}

//Consulta vacina Por idade
const consultaVacinaPoridade = async () => {
    const result = await pool.query('SELECT * FROM VACINA, VACINAAPLICADA, REDE');
    console.log(result.rows);
}



//pesquisaVacinaAplicada(4, 19)
consultaVacinaPersonalizada()

module.exports = {
    cadastrarPaciente,
    atualizarPaciente,
    pesquisaPacienteId

}


