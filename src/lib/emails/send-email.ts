import nodemailer from "nodemailer";

export interface EmailProps {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (mailOptions: EmailProps) => {
  const res = await transporter.sendMail({
    ...mailOptions,
    from: `Current Read <${process.env.EMAIL_NAME}>`,
  });
  return res;
};
