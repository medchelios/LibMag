import { Router} from "express";
import auth from "./AuthRoute"
import user from "./UserRoute"
import book from "./BookRoute"
const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", user);
routes.use("/books", book)

export default routes;
