const express = require("express");
const nodemailer = require("nodemailer");
const { sendEmail } = require('./emailService');
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    if (!Array.isArray(to) || to.length === 0) {
        return res.status(400).json({ error: "Recipient email list must be a non-empty array" });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",  // Office 365 SMTP host
        port: 587,                   // SMTP Port
        secure: false,               // Must be false for Office 365
        auth: {
            user: process.env.SMTP_USER, // Your Office 365 email
            pass: process.env.SMTP_PASS, // App password or real password
        },
        tls: {
            ciphers: "SSLv3",
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to.join(","), // Convert array to comma-separated string
            subject,
            text,
        });

        const result = await sendEmail(to, subject, text);
        res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

