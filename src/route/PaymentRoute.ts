import { PayFine, PaymentWebhookVerification } from "../controller/books/UserFinePaymentController";
import { RetrieveUserBorrowHistory, GetUserFines, GetSingleFineForUser } from "../controller/books/UserBookHistoryController";
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";


const router = Router();

router.post("/", VerifyJwtToken, PayFine);
router.post("/webhook", PaymentWebhookVerification);

export default router