const express = require('express');
const { sendEmail } = require('./emailService');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    
    next();
});
// Middleware to parse JSON requests
app.use(express.json());

// API Endpoint for sending emails
app.post('/send-email', async (req, res) => {
    const { recipients, subject, body } = req.body;

    if (!recipients || !subject || !body) {
        return res.status(400).json({ error: 'Missing required fields: recipients, subject, body' });
    }

    const result = await sendEmail(recipients, subject, body);
    res.status(result.success ? 200 : 500).json(result);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
