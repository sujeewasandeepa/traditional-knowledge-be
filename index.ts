import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';

const app: Express = express();

const port = 4000;

app.get('/', (req: Request, res: Response) => {
	res.send("Express + Typescript server!!");
});

app.post("/api", async(req:Request, res:Response) => {
	try {
		const client = await connectDB(); 
		const createtable = `
		      CREATE TABLE users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255),
			email VARCHAR(255)
		      );
		    `;

		await client.query(createtable);
		client.end();
		res.status(200).send('table created!');

	} catch (err) {
		console.error(err);
	}
});
app.get("/api", async (req:Request, res:Response) => {
	try {
		const pool = await connectDB();
		const checkTableQuery = `
		SELECT * FROM users;
	    `;
		const { rows } = await pool.query(checkTableQuery);
		console.log(rows);
		let result = ["all is well", rows];
		res.send(result);
	} catch (err) {
		console.error(err);
	}
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
