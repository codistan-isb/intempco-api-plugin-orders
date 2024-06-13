import nodemailer from 'nodemailer';

export default async function sendEmail(email, subject, html) {
    try {

        console.log("HOST", process.env.MAIL_HOST);
        console.log("PORT", process.env.MAIL_HOST_PORT);
        console.log("USER", process.env.MAIL_USER);
        console.log("PASS", process.env.MAIL_PASSWORD);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_HOST_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: html.replace(/<[^>]+>/g, ''),
            html: html,
        };

        console.log("MAIL OPTION ", mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log("INFOE", info);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        return false;
    }
};
