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

module.exports = {
    showVacinasCount
}
