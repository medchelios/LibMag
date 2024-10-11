import { UserSignUp, UserLogin } from "../controller/users/AuthController"
import { Router } from "express"


const router = Router();

router.post("/login", UserLogin);
router.post("/register", UserSignUp);

export default router