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

        res.json({ success: true, token, message: "User registered successfully" ,email:user.email});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};


const validateUser = async (req, res) => {
    try {
        // Extract user ID and token from request params
        const { id, token } = req.params;
        console.log(id, token);
        
        try {
            const validuser = await userModel.findOne({_id:id,  verifyToken:token} )
             console.log(validuser);
            // console.log("User validated successfully.")

            const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
            // console.log(verifyToken);
            if(validuser && verifyToken._id){
                res.status(201).json({status:201,validuser, message: "User validated successfully."})
            }else{
                res.status(401).json({status:401,message:"user not exist"})
            }
        } catch (error) {
            res.status(401).json({status:401,message:"error occur"})
        }

      
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error validating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        //console.log("Received email:", email);
       // console.log("Received OTP:", otp);

        const user = await userModel.findOne({ email });
        //console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

       // console.log("Stored OTP:", user.verifyOTP);
       // console.log(otp);

        if (user.verifyOTP === parseInt(otp)) {
            user.isVerified = true;
          //  console.log("User verified:", user.isVerified);
            await user.save();
            console.log("Updated user:", user);

            return res.status(200).json({ status: 200, success: true, message: "Email verification successful." });
        } else {
            console.log("Invalid OTP.");
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ success: false, message: "An error occurred while verifying OTP." });
    }
};





export { loginUser, registerUser,validateUser ,verifyEmail};
