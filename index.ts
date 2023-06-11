import express, { Express, Request, Response } from 'express';
import connectDB from './db';
import { info } from 'console';
import cors from 'cors';

const app: Express = express();

const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send("Express + Typescript server!!");
});

// creating a new info
app.post("/api/info", async(req:Request, res:Response) => {
	try {

    let id = '001';

    const client = await connectDB(); 
    
    // generating an ID
    const latestData = await client.query(`SELECT * FROM info ORDER BY timestamp DESC LIMIT 1`); 
    if (latestData) {
        let previousID = parseInt(latestData.rows[0].info_id);
        let newID = previousID + 1;
        let newIDStr = newID.toString().padStart(3, '0');
        id = newIDStr;
    }

    const information = req.body;
    const createInfoQuery = `
      INSERT INTO info(info_id, title, author_id, description, tags) 
      VALUES ('${id}', '${information.title}', '${information.author}', '${information.description}', '${information.tags}'); 
    `;
    console.log(createInfoQuery);
    await client.query(createInfoQuery);
    res.send("Info entered to the system!");

	} catch (err) {
		console.error(err);
	}
});

// delete an info
app.delete("/api/info", async (req:Request, res:Response) => {
    try {
        const id = req.body.id;
        const client = await connectDB();
        await client.query(`DELETE FROM info WHERE info_id = '${id}'`);
        res.send("Info deleted from the database");
    } catch (err) {
        console.error(err);
    }
});

// edit an info
//
// NOT COMPLETED
// test and verify everything work as expected. 
//
app.put("/api/info", async (req:Request, res:Response) => {
    try {
        const id = req.body.id;
        const client = await connectDB();

        await client.query(`UPDATE info SET title='${req.body.title}', description='${req.body.description}', tags='${req.body.tags}' WHERE info_id = '${id}'`);

    } catch (err) {
        console.error(err);
    }
});

// get everything from the users
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

// get top 10 latest infos
app.get("/api/info", async (req:Request, res:Response) => {
    try {
        const pool = await connectDB();
        const getInfosQuery = `
        SELECT *
        FROM info
        ORDER BY timestamp DESC
        LIMIT 10;
        `
        const { rows } = await pool.query(getInfosQuery);
        console.log(rows);
        let result = ["latest 10 infos retrieved!", rows];
        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
