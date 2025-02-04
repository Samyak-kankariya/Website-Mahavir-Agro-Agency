require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle Enquiry Form Submission
app.post("/submit-enquiry", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Configure Nodemailer Transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.samyakkankariya0011, // Your email
                pass: process.env.Password, // App password
            },
        });

        // Email Options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.samyakkankariya0011, // The recipient email
            subject: "New Enquiry from Website",
            html: `
                <h2>New Enquiry Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.json({ success: "Enquiry sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Server error, try again later." });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
