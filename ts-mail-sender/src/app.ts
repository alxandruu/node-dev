import * as env from "dotenv"
import express from "express"
import logger from "./services/logger/logger";
import * as bodyParser from "body-parser";
import mailer from "./services/mailer/mailer";
env.config()
const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.post('/mail', (req, res): void => {
    mailer.send(req.body).then((status: boolean) => {
        const code: number = status ? 200 : 500
        res.status(code).send()
    })
})

app.listen(process.env.PORT, (): void => {
    logger.info(`Mail Sender Microservice listening at port ${process.env.PORT}`)
})
