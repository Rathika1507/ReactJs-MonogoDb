const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "srathika010@gmail.com",
      pass: "qpqz ehyt ogxs qqwb",
    },
  });

  const mailOptions = {
    from: "srathika010@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.send("Email sent: " + info.response);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
