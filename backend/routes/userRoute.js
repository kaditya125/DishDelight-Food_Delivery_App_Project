import express from "express";
import { loginUser, registerUser,validateUser,verifyEmail } from "../controllers/userController.js";


const userRouter = express.Router(); // Corrected typo in 'express'

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/forgotpassword/:id/:token", validateUser);
userRouter.post("/verify-email",  verifyEmail )

export default userRouter;
