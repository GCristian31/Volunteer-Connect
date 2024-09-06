const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL, // Sender address
        to: options.email, // List of recipients
        subject: options.subject, // Subject line
        html: options.message, // Plain text body replaced with HTML content
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
