
import nodeMailer from 'nodemailer';

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    });
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    // console.log(mailOptions)
    await transporter.sendMail(mailOptions);
}




/*

import { SMTPClient } from 'emailjs';
const sendEmail = async (options) => {
    const client = new SMTPClient({
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
        host: process.env.SMTP_HOST,
        ssl: true,
    });

    const message = {
        text: options.message,
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
    };
    console.log(message)
    client.send(message, function (err, message) {
        console.log(err || message);
    });
}
*/
export default sendEmail;