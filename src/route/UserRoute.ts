import { GetUserProfile, UpdateUserProfile } from "../controller/users/UserController"
import { Router } from "express"
import { VerifyJwtToken } from "../middleware/JwtMiddleware";


const router = Router();

router.get("/", VerifyJwtToken, GetUserProfile);
router.put("/", VerifyJwtToken, UpdateUserProfile);

export default router