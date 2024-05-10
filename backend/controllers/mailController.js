import nodemailer from "nodemailer";
import http from "http";

const sendMail = async (req, res) => {
    try {
        // Create a test account for nodemailer
        let testAccount = await nodemailer.createTestAccount();

        // Create a transporter with SMTP settings
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            // host: 'smtp.ethereal.email',
            port: 465,
            auth: {
                user: 'adit.jnu778199@gmail.com',
                pass: 'llaf fxoj seql qmso'
            }
        });

        // Extract necessary data from request body
        const { to, subject, html } = req.body;

        // Send the email using nodemailer
        const info = await transporter.sendMail({
            from: '"DishDelight" <kaditya125.ak@gmail.com>',
            to: to,
            subject: subject,
            html: html
        });

        // Log the message sent and send a response
        console.log("Message sent: %s", info.messageId);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { sendMail };
