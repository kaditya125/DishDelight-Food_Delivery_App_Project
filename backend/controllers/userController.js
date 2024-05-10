import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Generate a JSON Web Token (JWT) for the user
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        const token = createToken(user._id);

        res.status(200).json({ success: true, token, name: user.name, password: user.password });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Register user
const registerUser = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
        // Check if the email is already in use
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Check if the mobile number is already in use
        const mobileExists = await userModel.findOne({ mobile });
        if (mobileExists) {
            return res.status(400).json({ success: false, message: "Mobile number already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email address" });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user in the database
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            mobile
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

export { loginUser, registerUser };
