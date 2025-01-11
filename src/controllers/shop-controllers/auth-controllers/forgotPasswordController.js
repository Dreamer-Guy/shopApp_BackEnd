import forgotPasswordService from '../../../services/forgotPasswordService.js';
import userService from '../../../services/userService.js';
import ForgotPasswordToken from '../../../models/ForgotPasswordToken.js';

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const requestReset =  async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                message: 'Email is required'
            });
        }
        const result = await forgotPasswordService.createResetToken(email);
        if (!result.success) {
            return res.status(BAD_REQUEST_STATUS).json(result);
        }
        return res.status(SUCCESS_STATUS).json({
            success: true,
            message: 'Password reset instructions have been sent to your email'
        });
    } catch (error) {
        console.error(error);
        return res.status(SERVER_ERROR_STATUS).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

const resetPassword =  async(req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        if (!email || !token || !newPassword) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                message: 'Email, token and new password are required'
            });
        }
        const result = await forgotPasswordService.resetPassword(email, token, newPassword);
        if (!result.success) {
            return res.status(BAD_REQUEST_STATUS).json(result);
        }
        return res.status(SUCCESS_STATUS).json({
            success: true,
            message: 'Password reset successful'
        });
    } catch (error) {
        console.error(error);
        return res.status(SERVER_ERROR_STATUS).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

const verifyToken = async(req, res) => {
    try {
        const { email, token } = req.body;
        if (!email || !token) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                message: 'Email and token are required'
            });
        }
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                message: 'Email does not exist'
            });
        }
        const resetToken = await ForgotPasswordToken.findOne({
            userId: user._id,
            token: token
        });
        if (!resetToken) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                message: "Invalid verification code"
            });
        }
        if (resetToken.expiresAt < new Date()) {
            return res.status(BAD_REQUEST_STATUS).json({
                success: false,
                expired: true,
                message: "Your verification code has expired. Please request a new one."
            });
        }
        return res.status(SUCCESS_STATUS).json({
            success: true,
            message: "Verification code is valid"
        });
    } catch (error) {
        console.error(error);
        return res.status(SERVER_ERROR_STATUS).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};


export {requestReset, resetPassword, verifyToken}; 