import { BorrowBook } from "../controller/books/UserBorrowBooksController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";


const router = Router();

router.post("/borrow",VerifyJwtToken, BorrowBook);


export default router