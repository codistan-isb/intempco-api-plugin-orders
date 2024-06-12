import nodemailer from 'nodemailer';

export default async function sendEmail(email, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: "",
                pass: "",
            },
        });

        const mailOptions = {
            from: "",
            to: email,
            subject: subject,
            text: html.replace(/<[^>]+>/g, ''),
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log("INFOE", info);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        return false;
    }
};
