
/**
 *  Returns all the keys of the JSON Object, as an array. 
 *  The subkeys are returned appended by a dot, example: key1.key2
 * 
 * @param {Object} obj 
 * @param {String} prev 
 * @returns {Array<String>}
 */
export function keys(obj, prev) {
    let ar = []
    Object.keys(obj).forEach((k, i, a) => {
        let o = obj[k]
        let c = prev ?? '';
        if (typeof o === 'object') {
            c += k + '.'
            ar = ar.concat(keys(o, c))
        } else {
            ar.push(c + k)
        }
        c = (i == a.length - 1) ? '' : c

    })
    return ar;
}

/**
 * Gets value from JSON Object
 * 
 * @param {Object} obj JSON Object
 * @param {Array<String} arr ["key1", "key2"] 
 * If in the array is more than one string, it means that the next is an append of the before
 * @returns {String}
 */
export function value(obj, arr) {
    let value = null;
    arr.forEach((e, i, a) => {
        (i < a.length - 1) ? obj = obj[e] : value = obj[e]
    })
    return value
}