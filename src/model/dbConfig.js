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
//Consulta Paciente
const consultaPaciente = async () => {
    const result = await pool.query('SELECT * from PACIENTE');
    console.log(result.rows);
}
//Atualiza Paceiente 
const atualizarPaciente = async (idPaciente, novoNome, novaDataNascimento) => {
    const result = await pool.query('UPDATE PACIENTE SET nome = $2, Data_nascimento = $3 WHERE id_paciente = $1 RETURNING *', [idPaciente, novoNome, novaDataNascimento]);
}

//Consulta paciente por ID
const pesquisaPaciente = async () => {
    const result = await pool.query('SELECT * from PACIENTE');
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

//cadastrarPaciente("Victor", "1988-6-6")
//cadastrarIdRede('Rede Maluca')
//consultaRede()

//consultaPaciente() //Mudar nome da função

//atualizarPaciente(53, 'Victor novo', '09/12/2023')
consultaPaciente()
module.exports = {
    cadastrarPaciente,
    atualizarPaciente

}


