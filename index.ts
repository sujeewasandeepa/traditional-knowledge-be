import express, { Express, Request, Response } from 'express';
import connectDB from './db';

const app: Express = express();

const port = 4000;

// middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send("Express + Typescript server!!");
});

// creating a new info
app.post("/api/info", async(req:Request, res:Response) => {
	try {
    const information = req.body;
    const createInfoQuery = `
      INSERT INTO info(id, timestamp, title, author, description, tags) 
      VALUES ('${information.id}', '${information.timestamp}', '${information.title}',
        '${information.author}', '${information.description}', '${information.tags}'); 
    `;
    console.log(createInfoQuery);
    const client = await connectDB(); 
    await client.query(createInfoQuery);
    res.send("Info entered to the system!");

	} catch (err) {
		console.error(err);
	}
});
app.get("/api", async (req:Request, res:Response) => {
	try {
		const pool = await connectDB();
		const checkTableQuery = `
		SELECT * FROM users_new;
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
