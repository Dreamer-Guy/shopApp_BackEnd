import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

export const sendResetPasswordEmail = async (email, token) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Đặt lại mật khẩu',
            html: `
                <h1>Yêu cầu đặt lại mật khẩu</h1>
                <p>Mã xác nhận của bạn là: <strong>${verificationCode}</strong></p>
                <p>Mã này sẽ hết hạn sau 5 phút.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true, verificationCode };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
};
