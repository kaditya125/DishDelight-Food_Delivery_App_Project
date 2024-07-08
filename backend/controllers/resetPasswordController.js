// controllers/resetPasswordController.js

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const resetPassword = async (req, res) => {
  //  console.log(req);
    try {
        const { id, token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // Verify the token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(verifyToken)
        if (!verifyToken) {
            return res.status(401).json({ status: 401, message: "Invalid token" });
        }

        // Find the user by ID and verifytoken
       // console.log(id);
    
        const validuser = await userModel.findOne({_id:id, varifyToken:token} )
      // console.log(validuser);
        if (!validuser) {
            return res.status(404).json({ status: 404, message: "User not found or invalid token" });
        }
        // console.log("Adi"+validuser)
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ status: 400, message: "Passwords do not match" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password in the database
        validuser.password = hashedPassword;
        await validuser.save();

        // Send success response
        res.status(201).json({ status: 201, message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ status: 500, error: "Internal server error" });
    }
};

export { resetPassword };
