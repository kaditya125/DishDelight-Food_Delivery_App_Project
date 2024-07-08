import express from "express";
import authMiddleware from "../middleware/auth.js";
import { sendMail,forgetpass } from "../controllers/mailController.js";
import { sendVerificationOTP } from "../controllers/mailController.js";

const sendMailRouter = express.Router();

sendMailRouter.post("/email", sendMail);
sendMailRouter.post("/forgetpass",forgetpass );
sendMailRouter.post("/send-verification-email", sendVerificationOTP)

export default sendMailRouter;