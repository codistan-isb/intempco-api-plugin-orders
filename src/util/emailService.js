import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

export default async function sendEmail(email, subject, template, context) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_HOST_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const compiledTemplate = Handlebars.compile(template);
        const html = compiledTemplate(context);

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: html.replace(/<[^>]+>/g, ''),
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        return false;
    }
};
