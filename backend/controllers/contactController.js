const sendEmail = require("../utils/sendEmail");

exports.sendContactMessage = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message: userMessage } = req.body;

        const emailBody = `
            <p>${userMessage}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            
        `;

        await sendEmail({
            email: process.env.SMPT_MAIL,
            subject: "Event Application",
            message: emailBody 
        });

        res.status(201).send({ message: "Email has been sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
