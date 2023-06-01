import { Pool, QueryResult } from 'pg';  
import dotenv from 'dotenv';

dotenv.config();

export default async function connectDB () {
	const pool = new Pool({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		port: Number(process.env.PGPORT),
	});
	await pool.connect();
	return pool;
}
