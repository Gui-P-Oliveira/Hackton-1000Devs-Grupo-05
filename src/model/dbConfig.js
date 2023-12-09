const { Pool } = require('pg');

const pool = new Pool({
    user: 'sigrid',
    host: 'itcpostgresql.postgres.database.azure.com',
    database: 'db005',
    password: '%&unsas_aew27005',
    port: 5432,
    ssl: true
});

const showVacinasCount = async() => {
    const result = await pool.query('SELECT * from VACINA');
    console.log(result.rows);
}

const cadastrarPaciente = async(nome, dataNascimento) => {
    const data = new Date(dataNascimento);
    const result = await (`INSERT INTO PACIENTE (nome, Data_nascimento) VALUES (${11}, ${nome}, ${data} )`)    
}

const cadastrarIdRede = async(tipoRede) => {    
    const result = await (`INSERT INTO REDE (Tipo_rede) VALUES (${tipoRede})`)
    
}

const consultaPaciente = async() => {
    const result = await pool.query('SELECT * from PACIENTE');
    console.log(result.rows);
}

const consultaRede = async() => {
    const result = await pool.query('SELECT * from REDE');
    console.log(result.rows);
}

cadastrarPaciente("Joao", "1988-12-09")
cadastrarIdRede('Rede Maluca')
consultaPaciente()
consultaRede()

module.exports = {
    showVacinasCount
}
