import { AddBookToDb, UpdateBookInDb, DeleteBookInDb } from "../controller/admin/AdminBooksController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";
import { IsAdminRole } from "../middleware/AdminMiddleware";

const router = Router();

router.post("/books",VerifyJwtToken, IsAdminRole, AddBookToDb);
router.put("/books/:id", VerifyJwtToken, IsAdminRole, UpdateBookInDb);
router.delete("/books/:id", VerifyJwtToken, IsAdminRole, DeleteBookInDb);

export default router