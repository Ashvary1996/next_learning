import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER_ID,
        pass: process.env.MAIL_USER_PASS,
      },
    });

    const mailOptions = {
      from: "bar14@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset Your password",
      html: ` <p>
      Click <a href=${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}>here</a> to ${
        emailType === "VERIFY" ? "verify you email" : "reset your password"
      }
      or copy and paste the link below in your browser.
      <br />
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(`Message sent successfully to ${email}`);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
