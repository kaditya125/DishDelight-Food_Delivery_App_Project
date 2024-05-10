import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://kaditya125ak:Aditya778199@cluster0.pexstfm.mongodb.net/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}
