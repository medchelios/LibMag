import { AddBookToDb } from "../controller/admin/AdminBooksController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";
import { IsAdminRole } from "../middleware/AdminMiddleware";

const router = Router();

router.post("/books",VerifyJwtToken,IsAdminRole, AddBookToDb);


export default router