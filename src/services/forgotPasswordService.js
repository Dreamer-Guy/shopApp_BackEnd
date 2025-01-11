import ForgotPasswordToken from '../models/ForgotPasswordToken.js';
import userService from './userService.js';
import { sendResetPasswordEmail } from './emailService.js';
import { hashPassword } from '../utils/hashAndCompare.js';

const forgotPasswordService = {
  async createResetToken(email) {
    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return { success: false, message: 'Email does not exist in the system' };
      }

      await ForgotPasswordToken.deleteMany({ userId: user._id });

      const { success, verificationCode } = await sendResetPasswordEmail(email);
      
      if (!success) {
        return { success: false, message: 'Unable to send email' };
      }

      const passwordResetToken = new ForgotPasswordToken({
        userId: user._id,
        token: verificationCode.toString(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      });
      await passwordResetToken.save();

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  async verifyToken(email, token) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Email does not exist' };
    }

    const resetToken = await ForgotPasswordToken.findOne({
      userId: user._id,
      token: token,
      expiresAt: { $gt: new Date() }
    });

    if (!resetToken) {
      return { success: false, message: 'Invalid or expired verification code' };
    }

    return { success: true };
  },

  async resetPassword(email, token, newPassword) {
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return { success: false, message: 'Email does not exist' };
        }

        const resetToken = await ForgotPasswordToken.findOne({
            userId: user._id,
            token: token
        });

        if (!resetToken) {
            return { success: false, message: 'Verification code does not exist' };
        }

        if (resetToken.expiresAt < new Date()) {
            await resetToken.deleteOne();
            return { success: false, message: 'Verification code has expired' };
        }

        const hashedPassword = await hashPassword(newPassword);
        const updateResult = await userService.updatePassword(user._id, hashedPassword);
        
        if (!updateResult.success) {
            return updateResult;
        }

        await resetToken.deleteOne();
        return { success: true };
    } catch (error) {
        console.error('Reset password error:', error);
        return { success: false, message: error.message };
    }
  }
};

export default forgotPasswordService;
