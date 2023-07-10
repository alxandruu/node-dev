import * as fs from "node:fs/promises";
import * as env from "dotenv";
env.config();

const result = fs.readdir(process.env.INPUT_FOLDER);

result
    .then(data => fs.readFile(process.env.INPUT_FOLDER + data[0]))
    .then(data => console.log(data.toJSON()))