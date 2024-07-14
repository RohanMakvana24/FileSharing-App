import nodemailer from "nodemailer";

async function SendMail({ from, to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `File Sharing < ${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });

  console.log(info);
}

export default SendMail;
