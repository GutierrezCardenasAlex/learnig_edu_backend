const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("EMAIL ENVIADO:", info.messageId);
        return info;
    } catch (error) {
        console.log("ERROR EN MAIL:", error.message);
    }
};

module.exports = mailSender;
