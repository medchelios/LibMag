import { AddBookToDb } from "../controller/admin/AdminBooksController";
import { Router } from "express"


const router = Router();

router.post("/books", AddBookToDb);


export default router