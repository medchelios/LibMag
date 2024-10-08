import {GetAllBooks, GetBookById} from "../controller/books/UserBooksController"
// import { CheckCache } from "../middleware/CacheDataMiddleware";
import { Router } from "express"


const router = Router();

router.get("/", GetAllBooks);
router.get("/:id", GetBookById);

export default router