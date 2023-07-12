import * as fs from "node:fs/promises";
import * as env from "dotenv"
import JSZip from "jszip";
env.config();

/**
* Moves first file from folder to another
*
* @param inputF  String that specifies the origin folder
* @param outputF String that specifies the destination folder
* @return Return `Promise<void>` when success.
*/
export const moveFile = (inputF, outputF) => {
    let file
    return fs.readdir(inputF, { withFileTypes: true })
        .then(data => {
            data.every(val => {
                if (val.isFile())
                    file = val; return false
            })
            if (file) {
                return fs.copyFile(inputF + file.name, outputF + file.name).then(fs.rm(inputF + file.name));
            }
            throw Error(`No se ha encontrado ningun fichero en la ruta ${inputF}`)
        })
}


/**
* Deletes a file
*
* @param file  String pointing to file route
* @return Return `Promise<void>` when success.
*/
export const deleteFile = (file) => fs.rm(file)

/**
* Creates or overrides a file in the selected route
*
* @param route  Folder where is going to be created the file
* @param Object<{name, path}>  `Name` of the file, `Path` where the temporary file is stored (used to read the bytes)
* @return Return `Promise<void>` when success.
*/
export const createFile = (route, { name, path }) =>
    fs.readFile(path)
        .then(data => fs.writeFile(`${route + name}`, data))
        .then(fs.rm(path))

/**
* Split file content into multiple files by an ascii charachter and returns a zip with the multiple files
* Example -> for every line split into multiple files 
* @param  Object<{path}> `Path` where the temporary file is stored (used to read the bytes)
* @return Return `Promise<String>` when success.
*/
export const splitFile = ({ originalFilename, path }, { charCode, limit }) => {
    const zip = new JSZip();
    let j = 0;
    return fs.readFile(path)
        .then(data => {
            const positions = [];
            data.forEach(
                (x, i) => {
                    if (x == charCode) {
                        j++
                        if (j >= limit) {
                            j = 0;
                            positions.push(i);
                        }
                    }
                }
            );
            positions.push(data.length - 1);
            positions.forEach((v, i) => {
                const { buffer } = data;
                const slicedBytes = i == 0 ? buffer.slice(i, v) : buffer.slice(positions[i - 1] + 1, i == positions.length - 1 ? v + 1 : v);
                console.log(slicedBytes);
                zip.file(`split${i + 1}_${originalFilename}`, slicedBytes);
            })
        })
        .then(fs.rm(path))
        .then(async () => {
            const route = `${process.env.TEMP_FOLDER}/splittedFiles.zip`;
            await zip.generateAsync({ type: 'arrayBuffer' }).then(data => fs.writeFile(route, new DataView(data)))
            return route;
        })
}

