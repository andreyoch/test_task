import { Pool, QueryResult, QueryResultRow } from 'pg';
import 'dotenv/config';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
let connectedToDatabase = false;

pool.on('connect', () => {
  if (!connectedToDatabase) {
    connectedToDatabase = true;
    console.log('Connected to the database');
  }
});

interface DatabaseError extends Error {
  code?: string;
}

const query = async <T extends QueryResultRow>(
  text: string,
  params?: Array<string | number | boolean>
): Promise<QueryResult<T>> => {
  try {
    const res = await pool.query<T>(text, params);
    return res;
  } catch (err) {
    const dbError = err as DatabaseError;
    throw dbError;
  }
};

const createUserTable = async () => {
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        lastname VARCHAR(255),
        email VARCHAR(255),
        login VARCHAR(255),
        password VARCHAR(255),
        phone VARCHAR(255)
      )
    `;
    await query(queryText);
    console.log('users table created successfully');
  } catch (error) {
    console.error('Error creating User table:', error);
  }
};

createUserTable();

export { query };
