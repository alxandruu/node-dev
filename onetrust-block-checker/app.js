import * as env from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import { analyzeOnetrustBlocks } from './services/sitesReader'
env.config()
const app = express()
app.use(bodyParser.json());

app.post("/", async (req, res) => {
    const sites = req.body.sites
    const scriptsToCheck = req.body.check
    const result = await analyzeOnetrustBlocks(sites, scriptsToCheck)
    if (result)
        res.status(200).send(result)
    else
        res.status(400).send()
})

app.listen(process.env.PORT, () => {
    console.log(`Onetrust Block Checker listening...`)
})