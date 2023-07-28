import { JSDOM } from "jsdom"
import { keys, value } from "./ojson"


/**
 * Completes the template with the passed variables
 * @param {String} template HTML
 * @param {Array<Object>} variables Array with the variables
 * @returns {String} HTML of the filled template
 */
export async function fillTemplate(template, variables) {
    const doc = await new JSDOM(template).window.document
    for (let e of variables){
        const type = Object.prototype.toString.call(e.value)
        switch (type) {
            case VARIABLE_TEXT.a:
                VARIABLE_TEXT.c(doc, e)
                break;
            case VARIABLE_ARRAY.a:
                VARIABLE_ARRAY.c(doc, e)
                break;
            case VARIABLE_OBJECT.a:
                VARIABLE_OBJECT.c(doc, e)
                break;
            default:
                break;
        }
    }
    return doc.documentElement.innerHTML
}


/**
 * Simple Text
 * --text:
 * @type {TemplateVariableObject}
 */
export const VARIABLE_TEXT = {
    a: '[object String]',
    b: `--text:`,
    c: (doc, e) => {
        doc.body.innerHTML = doc.body.innerHTML.replaceAll(generateRegexp(VARIABLE_TEXT.b + e.key), e.value)
    }
}
/**
 * Loop 
 * --repeat:
 * @type {TemplateVariableObject}
 */
export const VARIABLE_ARRAY = {
    a: '[object Array]',
    b: `--repeat:`,
    c: (doc, e) => {
        const elements = doc.body.querySelectorAll(`[${VARIABLE_ARRAY.b + e.key}]`)
        elements.forEach(el => {
            el.removeAttribute(VARIABLE_ARRAY.b + e.key)
            for (let i = 0; i < e.value.length; i++) {
                let clone = el.cloneNode(true);
                Object.keys(e.value[i]).forEach(k => {
                    clone.innerHTML = clone.innerHTML.replaceAll(generateRegexp(VARIABLE_TEXT.b + k), e.value[i][k])
                })
                el.after(clone)
            }
            el.remove()
        })
    }
}
/**
 * Object structure 
 * @type {TemplateVariableObject}
 */
export const VARIABLE_OBJECT = {
    a: '[object Object]',
    b: null,
    c: (doc, e) => {
        let objectKeys = keys(e.value);
        objectKeys.forEach(el => {
            const v = value(e.value, el.split("."));
            VARIABLE_TEXT.c(doc, { key: `${e.key}.${el}`, value: v })
        })
    }
}

/**
 * Generate Regexp for replaceAll
 * @param {String} v Value inserted in the regexp
 * @returns {RegExp}
 */
const generateRegexp = (v) => {
    return new RegExp(`(?<=[>\s])${v}\\b`, "g")
}


/**
 * @typedef {Object} TemplateVariableObject
 * @property {String} a - String that internally references his type
 * @property {String} b - String referring to the field to be changed in the template
 * @property {function} c - Function that takes 'document' and 'key-value object' parameters and completes the HTML with the value.
 */