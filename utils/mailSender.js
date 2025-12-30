const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,   // smtp.gmail.com
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `"Academia Sigzen" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Correo enviado:", info.messageId);
        return info;
    } catch (error) {
        console.log("ERROR EMAIL:", error.message);
    }
};

module.exports = mailSender;
