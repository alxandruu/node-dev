import moment from "moment"

const info = (message) => {
    console.log(`[INFO][${moment().format()}] - ${message}`)
}
const debug = (message) => {
    console.log(`[DEBUG][${moment().format()}] - ${message}`)
}
const error = (message) => {
    console.error(`[ERROR][${moment().format()}] - ${message}`)
}

export default {
    info,
    debug,
    error
};
