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

// Route to Handle Enquiry Form
app.post("/submit-enquiry", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Setup Nodemailer Transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // ✅ Corrected
                pass: process.env.EMAIL_PASS, // ✅ Corrected
            },
        });

        // Email Options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
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
        console.error("❌ Email sending error:", error.message);
        res.status(500).json({ error: "Server error, try again later." });
    }
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
