import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({
  email,
  emailType,
  userID,
}: {
  email: string;
  emailType: string;
  userID: string;
}) => {
  try {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "76c02edc06c013",
        pass: "ba14e93c45d885",
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verify?token=${token}`
        : `${process.env.DOMAIN}/reset-password?token=${token}`;

    const mailOptions = {
      from: '"My App" <no-reply@myapp.test>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text:
        emailType === "VERIFY"
          ? `Please verify your email by clicking this link: ${link}`
          : `Reset your password using this link: ${link}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>${
            emailType === "VERIFY" ? "Email Verification" : "Password Reset"
          }</h2>
          <p>${
            emailType === "VERIFY"
              ? "Click below to verify your email."
              : "Click below to reset your password."
          }</p>
          <a href="${link}" style="display:inline-block;padding:10px 15px;background:#8b5e3c;color:#fff;text-decoration:none;border-radius:5px;margin-top:10px;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
          <p>If the button doesn’t work, copy this link:</p>
          <p>${link}</p>
        </div>
      `,
    };

    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
