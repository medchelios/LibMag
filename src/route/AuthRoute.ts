import {UserSignUp, UserLogin} from "../controller/AuthController"
import { Router } from "express"


const router = Router();

router.post("/login", UserLogin);
router.post("/register", UserSignUp);

export default router