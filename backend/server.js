import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import sendMailRouter from "./routes/sendMailRouter.js";
import resetPasswordRouter from "./routes/resetPasswordRoute.js";

import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const router = express.Router();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDb();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads')); // 
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/mail", sendMailRouter);
app.use("/api/reset-password", resetPasswordRouter);



// Root route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
