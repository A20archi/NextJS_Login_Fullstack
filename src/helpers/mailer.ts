import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { Hash } from "node:crypto"; 


export const sendEmail = async ({
  email,
  emailType,
  userID,
}: { email: string; emailType: string; userID: string }) =>{
    try{
      const hashToken = await bcryptjs.hash(userID.toString(), 10);

      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userID, {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userID, {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      }

      //use nodemailer
      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "76c02edc06c013",
          pass: "ba14e93c45d885",
        },
      });

      const mailOptions = {
        from: '"My App" <no-reply@myapp.test>', // Appears as sender in Mailtrap
        to: email, // Recipient’s address
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset your password",

        // Plain-text version
        text:
          emailType === "VERIFY"
            ? `Please verify your email by clicking this link: ${process.env.domain}/verifyemail?token=${hashToken}`
            : `Reset your password using this link: ${process.env.domain}/reset-password?token=${hashToken}`,

        // HTML version (optional but nicer)
        html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>${
        emailType === "VERIFY" ? "Email Verification" : "Password Reset"
      }</h2>
      <p>${
        emailType === "VERIFY"
          ? "Click the button below to verify your email address."
          : "Click the button below to reset your password."
      }</p>
      <a href="${process.env.domain}/${
          emailType === "VERIFY" ? "verify" : "reset-password"
        }?token=${hashToken}" 
        style="display:inline-block;padding:10px 15px;
               background:#8b5e3c;color:#fff;text-decoration:none;
               border-radius:5px;margin-top:10px;">
        ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
      </a>
      <p>If the button doesn’t work, copy this link:</p>
      <p>${process.env.domain}/${
          emailType === "VERIFY" ? "verify" : "reset-password"
        }?token=${hashToken}</p>
    </div>
  `,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse; // Optional: return response for debugging/logging
    }catch(error:any)
    {
        throw new Error(error.message)
    }
}