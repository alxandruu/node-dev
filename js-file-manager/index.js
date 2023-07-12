import * as env from "dotenv"
import { moveFile, deleteFile, createFile, splitFile } from "./services/fileService.js"
import express from "express";
import bodyParser from "body-parser"
import multipart from "connect-multiparty"
const app = express()
env.config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(multipart());

app.post('/file/move', (req, res) => {
    const { inputFolder, outputFolder } = req.body;
    moveFile(inputFolder, outputFolder)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            console.log(e)
            res.status(500).send()
        });
})

app.post('/file/delete', (req, res) => {
    const { file } = req.body;
    deleteFile(file)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            console.log(e)
            res.status(500).send()
        });
})

app.post('/file/create', (req, res) => {
    createFile(req.body.route, req.files.file)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            console.log(e)
            res.status(500).send()
        });
})

app.post('/file/split', (req, res) => {
    splitFile(req.files.file, req.body)
        .then(route => {
            res.status(200).download(route);
            deleteFile(route);
        })
        .catch(e => {
            console.log(e)
            res.status(500).send()
        });
})

app.listen(PORT, () => {
    console.log(`File Manager listening on port ${PORT}`)
})