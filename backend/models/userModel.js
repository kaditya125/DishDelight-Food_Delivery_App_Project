import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    verifyToken: { type: String }, // Field to store verification token
    verifyOTP: { type: Number }, // Field to store verification OTP
    isVerified: { type: Boolean, default: false } // Field to store verification status
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
