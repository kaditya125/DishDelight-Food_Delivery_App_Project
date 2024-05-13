// routes/resetPasswordRoute.js

import express from "express";
import { resetPassword } from "../controllers/resetPasswordController.js";

const resetPasswordRouter = express.Router();

// POST request to reset password
resetPasswordRouter.post("/:id/:token", resetPassword); // Add route path here

export default resetPasswordRouter;
