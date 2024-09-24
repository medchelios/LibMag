import { Router} from "express";
import auth from "./AuthRoute"

const routes = Router();

routes.use("/auth", auth);

export default routes;
