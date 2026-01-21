const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    try {
      await transporter.verify();
      console.log("Server is ready to take our messages");
    } catch (err) {
      console.error("Verification failed", err);
    }
    const info = await transporter.sendMail({
      from: "EduTech",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`
    });
    console.log(info);
  } catch (err) {
    console.log("transporter not working", err);
  }
};

module.exports = mailSender; 
