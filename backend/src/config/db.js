import pg from 'pg';

// Create a new Pool instance
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'shantu69',
    port: 5432,
});

export default pool;