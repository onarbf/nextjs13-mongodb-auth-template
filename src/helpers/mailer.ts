import { connect } from "@/helpers/dbConfig"
import User from "@/models/userModel"
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')

connect()
export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType === "RECOVER") {
      console.log('generating recoverPasswordCode')
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      // secure: false,
      // secureConnection: false,
      greetingTimeout : 1000 * 120,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      },
    //   tls: {
    //     ciphers:'SSLv3'
    // }
    });

    const verifyUrl = `${process.env.DOMAIN}/user/verifyEmail?token=${hashedToken}`
    const recoverPasswordUrl = `${process.env.DOMAIN}//user/recoverPassword/two?token=${hashedToken}`
    const mailOptions = {
      from: 'fcoches@onar.dev',
      to: email,
      subject: emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p> Click on 
      <a href="${emailType === "VERIFY"?verifyUrl: recoverPasswordUrl}">this link</a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
      </p>`
    }
    console.log(mailOptions)
    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}
