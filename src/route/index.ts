import { Router} from "express";
import auth from "./AuthRoute"
import user from "./UserRoute"
const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", user)

export default routes;
