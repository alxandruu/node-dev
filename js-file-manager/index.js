import * as env from "dotenv"
import { moveFile, deleteFile, createFile, splitFile } from "./services/fileService.js"
import express from "express";
import bodyParser from "body-parser"
import multipart from "connect-multiparty"

env.config();
const app = express()
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(multipart());

const PORT = process.env.PORT;

app.post('/file/move', (req, res) => {
    moveFile(req.body)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            res.status(500).send(e.message)
            console.log(e)
        });
})

app.post('/file/delete', (req, res) => {
    deleteFile(req.body.file)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            res.status(500).send(e.message)
            console.log(e)
        });
})

app.post('/file/create', (req, res) => {
    createFile(req.body.route, req.files.file)
        .then(() => {
            res.status(200).send()
        })
        .catch(e => {
            res.status(500).send()
            console.log(e)
        });
})

app.post('/file/split', (req, res) => {
    splitFile(req.files.file, req.body)
        .then(route => {
            res.status(200).download(route);
            deleteFile(route);
        })
        .catch(e => {
            res.status(500).send()
            console.log(e)
        });
})

app.listen(PORT, () => {
    console.log(`File Manager Server listening on port ${PORT}`)
})