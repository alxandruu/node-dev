import * as nodemailer from "nodemailer"
import * as env from "dotenv"
import logger from "../logger/logger";
import Mail from "nodemailer/lib/mailer";
env.config()

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const send = (options: Mail.Options): Promise<boolean> =>
    transporter.sendMail(options)
        .then(status => {
            logger.info(`Email sent: ${status.response}`)
            return true
        })
        .catch((e) => {
            logger.error(e)
            return false
        })

export default {
    send
}


