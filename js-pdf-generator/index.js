import * as env from 'dotenv'
import express from 'express'
import { generatePdf } from './services/generator'
import bodyParser from 'body-parser'
import multipart from 'connect-multiparty'
env.config()
const app = express()

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(multipart());

app.post('/generate/pdf', async (req, res) => {

    const configuration = JSON.parse(req.body.configuration)
    const template = req.files.template
    await generatePdf(template, configuration).then(
        (data) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(data);
        }
    ).catch(e => {
        res.status(500).send()
        console.log(e)
    });
})

app.listen(process.env.PORT, () => {
    console.log(`PDF Generator Server listening...`)
})