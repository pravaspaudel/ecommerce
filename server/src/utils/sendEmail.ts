import nodeMailer from "nodemailer";
import { ENV } from "../config/env.config.ts";

interface Mail {
  email: string;
  subject: string;
  message: string;
}

export const sendMail = async ({ email, subject, message }: Mail) => {
  const transporter = nodeMailer.createTransport({
    host: ENV.SMTP_HOST,
    service: ENV.SMTP_SERVICE,
    secure: ENV.SMTP_PORT == 465,
    auth: {
      user: ENV.SMTP_EMAIL,
      pass: ENV.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Ecommerce" <${ENV.SMTP_EMAIL}>`,
    to: email,
    subject,
    html: message,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("email send:", info.messageId);
};
