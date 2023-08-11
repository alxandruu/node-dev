import moment from "moment"

const info = (message: string) => {
    console.log(`[INFO][${moment().format()}] - ${message}`)
}
const debug = (message: string) => {
    console.log(`[DEBUG][${moment().format()}] - ${message}`)
}
const error = (message: string) => {
    console.error(`[ERROR][${moment().format()}] - ${message}`)
}

export default {
    info,
    debug,
    error
};
