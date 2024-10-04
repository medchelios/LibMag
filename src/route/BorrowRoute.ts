import { BorrowBook,ReturnBook, RenewBook } from "../controller/books/UserBorrowBooksController";
import { RetrieveUserBorrowHistory, GetUserFines } from "../controller/books/UserBookHistoryController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";


const router = Router();

router.post("/borrow",VerifyJwtToken, BorrowBook);
router.post("/return",VerifyJwtToken, ReturnBook);
router.post("/renew",VerifyJwtToken, RenewBook);
router.get("/history", VerifyJwtToken, RetrieveUserBorrowHistory);
router.get("/fines",VerifyJwtToken, GetUserFines)
export default router