import express, { Express, Request, Response } from "express";
import {port} from './config';
import {initializeDB} from './data-source'

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  await initializeDB()
  console.log(`[server]: Server is running at http://localhost:${port}`);
});