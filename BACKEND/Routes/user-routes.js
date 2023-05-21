import express from "express";
import { deleteUser, getAllUsers, getBookingOfUser, getUserById, login, updateUser } from "../Controllers/user-controller";
import { signup } from "../Controllers/user-controller";


const userRouter = express.Router();

userRouter.get("/",getAllUsers);

userRouter.get("/:id",getUserById);

userRouter.post("/signup",signup)

userRouter.put("/:id",updateUser);

userRouter.delete("/:id",deleteUser);

userRouter.post("/login",login);

userRouter.get("/bookings/:id",getBookingOfUser);

export default userRouter;