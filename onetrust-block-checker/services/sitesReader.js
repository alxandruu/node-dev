import * as pup from 'puppeteer'
import logger from './logger'

const userAgent = 'Mozilla/5.0 (X11 Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

export const analyzeOnetrustBlocks = async (sites, urls) => {
    const browser = await pup.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.setUserAgent(userAgent).then(() => { })

    const hasUrls = []
    for (let i = 0; i < sites.length; i++) {
        try {
            const site = sites[i]
            const siteResult = await page.goto(site, { waitUntil: 'load', timeout: 0 }).then(async () => {
                logger.debug(`[analyzeOnetrustBlocks] Bot accessed to ${site} `)
                const scriptSrc = await page.evaluate(() => {
                    return document.querySelector('script[src*="OtAutoBlock.js"]').getAttribute("src")
                })
                await page.waitForSelector('script[src*="OtAutoBlock.js"]');
                logger.debug(`[analyzeOnetrustBlocks] Bot detected JS Link ${scriptSrc}`)
                return await analyzeScript(scriptSrc, urls)
            })
            if (siteResult.length > 0)
                hasUrls.push({ "site": site, detection: siteResult })
        } catch (error) {
            logger.error(`[analyzeOnetrustBlocks] Failed: ${error}`)
        }
    }
    return hasUrls
}

async function analyzeScript(src, urls) {
    const result = await fetch(src)
        .then(response => {
            if (response.status == 200) {
                return response.text()
            }
            return null
        }).then(body => {
            const detectedScripts = []
            urls.forEach(u => {
                if (body.includes(u)) {
                    detectedScripts.push(u)
                }
            })
            return detectedScripts
        })
    logger.debug(`[analyzeScript] Analyze done, ${result.length} detected`)
    return result
}