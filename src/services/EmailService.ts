import nodemailer from 'nodemailer'
import { senderEmail, senderPassword } from '../config';

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});


export const SendEmail = async (sendTo: String | any, subject: String | any, message: String | any) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `LIBMAG <${senderEmail}>`, // sender address
      to: sendTo, // list of receivers
      subject: subject, // Subject line
      html: message, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log({ message: "Email Error", error: error });
  }
}