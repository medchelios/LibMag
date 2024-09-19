import express, { Express, Request, Response } from "express";
import {port} from './config';
import {initializeDB} from './data-source'

const app: Express = express();

// initializeDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});