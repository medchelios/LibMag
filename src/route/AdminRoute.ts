import { AddBookToDb, UpdateBookInDb, DeleteBookInDb } from "../controller/admin/AdminBooksController";
import { GetAllUsers, GetSingleUser, UpdateUserDetails, DeleteSingleUser } from "../controller/admin/AdminUserController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";
import { IsAdminRole } from "../middleware/AdminMiddleware";
import { ApproveBookReturn, RetrieveAllBorrowHistory } from "../controller/admin/AdminBorrowBookController";

const router = Router();

// Books Route
router.post("/books", VerifyJwtToken, IsAdminRole, AddBookToDb);
router.put("/books/:id", VerifyJwtToken, IsAdminRole, UpdateBookInDb);
router.delete("/books/:id", VerifyJwtToken, IsAdminRole, DeleteBookInDb);

// User Route
router.get("/users", VerifyJwtToken, IsAdminRole, GetAllUsers)
router.get("/users/:id", VerifyJwtToken, IsAdminRole, GetSingleUser)
router.put("/users/:id", VerifyJwtToken, IsAdminRole, UpdateUserDetails)
router.delete("/users/:id", VerifyJwtToken, IsAdminRole, DeleteSingleUser)

// Borrow Books Route
router.get("/history", VerifyJwtToken, IsAdminRole, RetrieveAllBorrowHistory)
router.put("/approve/:id", VerifyJwtToken, IsAdminRole, ApproveBookReturn)


export default router