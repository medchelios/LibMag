import { Router} from "express";
import auth from "./AuthRoute"
import user from "./UserRoute"
import book from "./BookRoute"
import admin from "./AdminRoute"
const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", user);
routes.use("/books", book);
routes.use("/admin", admin)

export default routes;
