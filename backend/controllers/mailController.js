import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";
import jwt from 'jsonwebtoken';


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'adit.jnu778199@gmail.com',
        pass: 'llaf fxoj seql qmso'
    }
});

const sendMail = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { email, orderData, orderItems, subject, html } = req.body;

        // Construct email content
        let orderDetails = '';
        orderItems.forEach((item) => {
            orderDetails += `<p>${item.name} - Quantity: ${item.quantity} - Price: ${item.price * item.quantity}</p>`;
        });

        const emailContent = `
          <p>Dear Customer,</p>
          <p>Your order has been successfully placed with the following details:</p>
          ${orderDetails}
          <p>Total Amount: ${orderData.amount}</p>
          <p>Thank you for shopping with us!</p>
        `;

        // Send the email using nodemailer
        const info = await transporter.sendMail({
            from: '"DishDelight" <adit.jnu778199@gmail.com>',
            to: email,
            subject: subject,
            html: emailContent
        });

        // Log the message sent and send a response
        console.log("Message sent: %s", info.messageId);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const forgetpass = async (req, res) => {
    try {
        // Implement forget password logic here
        
        // Dummy response for now

        const {email}  = req.body;

        if(!email){
            res.status(401).json({status:401,message:"Enter Your Email"});


        }
        
        try {
            const userfind =  await  userModel.findOne({email:email});
           //  console.log(userfind);

            const token = jwt.sign({_id:userfind._id},process.env.JWT_SECRET,{
                expiresIn:"1d"
            });
           // console.log("token"+token);

            const setusertoken = await userModel.findByIdAndUpdate({_id:userfind._id},{varifytoken:token},{new:true});
           // console.log("setusertoken",setusertoken);

            if(setusertoken){
                const mailOptions ={
                    from:"adit.jnu778199@gmail.com",
                    to: email,
                    subject: "Sending Email for password Reset",
                    text:`This Link Valid for 2 minutes http://localhost:5173/forgotpassword/${userfind.id}/${setusertoken.varifytoken}`
                }
               

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error);
                        res.status(401).json({status:401,message:"email not send"})
                    }
                    else{
                        console.log("Email sent", info.response);
                        res.status(201).json({status:201,message:"Email send Succesfully"})

                    }
                })

            }

            // console.log("userfind",userfind);
        } catch (error) {
            res.status(401).json({status:401,message:"Invalid User"})
        }


        // console.log(req.body)
        res.json({req:req.body, message: "Forget password email sent successfully" });
    } catch (error) {
        console.error("Error sending forget password email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendVerificationOTP = async (req, res) => {
    try {
        // Extract email from request body
        const { email } = req.body;

       // console.log("aDitya "+ email)

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ error: "Email address is required" });
        }

        // Generate a random 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Store the OTP temporarily in the database
        // Replace this with your database logic
        await userModel.updateOne({ email }, { $set: { verifyOTP: otp } });

        // Send the OTP via email
        const mailOptions = {
            from: "adit.jnu778199@gmail.com",
            to: email,
            subject: "Verification OTP",
            text: `Your verification OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending OTP email:", error);
                return res.status(500).json({ error: "Failed to send OTP email" });
            }
            console.log("OTP email sent:", info.response);
            return res.status(200).json({ message: "Verification OTP sent successfully" });
        });
    } catch (error) {
        console.error("Error sending verification OTP:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export { sendMail, forgetpass ,sendVerificationOTP};
