import { Router } from "express";
import auth from "./AuthRoute"
import user from "./UserRoute"
import book from "./BookRoute"
import admin from "./AdminRoute"
import borrow from "./BorrowRoute"
import payment from "./PaymentRoute"
const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", user);
routes.use("/books", book);
routes.use("/admin", admin);
routes.use("/", borrow)
routes.use("/pay", payment)

export default routes;
