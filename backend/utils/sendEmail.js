const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const emailUser = process.env.EMAIL_USERNAME;
    const emailPass = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPass || emailPass === 'your_app_password') {
        console.warn('SMTP not configured. Set EMAIL_USERNAME and EMAIL_PASSWORD in .env to send emails.');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    const message = {
        from: `${process.env.FROM_NAME || 'Haridass'} <${process.env.FROM_EMAIL || emailUser}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Email sent:', info.messageId);
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
};

module.exports = sendEmail;
