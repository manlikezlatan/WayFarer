import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const dbConfig = { connectionString: process.env.database_url };
const pool = new Pool(dbConfig);

export default pool;
