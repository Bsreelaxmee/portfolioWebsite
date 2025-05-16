const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Test Route to check if server is running
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// ✅ Handle form submissions
app.post("/send-message", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // ✅ Configure Nodemailer to send emails
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "22d41a3307@gmail.com",  // Replace with your email
            pass: "#radhakrishna5577"    // Replace with your app password (if required)
        }
    });

    const mailOptions = {
        from: email,
        to: "22d41a3307@gmail.com",  // Replace with your email
        subject: `Message from ${name}: ${subject}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send message." });
    }
});

// ✅ Start the server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
