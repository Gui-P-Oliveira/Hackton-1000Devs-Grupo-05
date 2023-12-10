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

//Cadastrar rede
const cadastrarIdRede = async (tipoRede) => {
    const result = await pool.query('INSERT INTO REDE (Id_rede, Tipo_rede) VALUES ((SELECT COALESCE(MAX(Id_rede), 0) + 1 FROM REDE), $1) RETURNING *', [tipoRede]);
}
//Consulta rede
const consultaRede = async () => {
    const result = await pool.query('SELECT * from REDE');
    console.log(result.rows);
}

const showVacinas = async () => {
    const result = await pool.query('SELECT * from VACINA');
    console.log(result.rows);
}
const showVacinaAplicada = async () => {
    const result = await pool.query('SELECT * from VACINAAPLICADA');
    console.log(result.rows);
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






excluiVacinaAplicada(1, 3)
// inseriVacinaAplicada(2, 33, "1999-10-19")
showVacinaAplicada()


// showVacinas()
// VacinaAplicada()

//cadastrarPaciente("Victor", "1988-6-6")
//cadastrarIdRede('Rede Maluca')
//consultaRede()

// consultaPacientes() //Mudar nome da função

//atualizarPaciente(53, 'Victor novo', '09/12/2023')

module.exports = {
    cadastrarPaciente,
    atualizarPaciente,
    consultaPacientes,
    pesquisaPaciente,
    inseriVacinaAplicada,
    excluiVacinaAplicada,
    pesquisaVacinaAplicada

}


