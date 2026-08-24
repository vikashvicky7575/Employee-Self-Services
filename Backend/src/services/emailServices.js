import { transporter } from "../config/mailConfig.js";

export const sendAnnouncementEmail = async (employees, title, description) => {
  for (const emp of employees) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: emp.official_email,

      subject: title,

      html: `
    <h2>${title}</h2>

    <p>${description}</p>

    <br/>

    <small>HR Department</small>
  `,
    });
  }
};
