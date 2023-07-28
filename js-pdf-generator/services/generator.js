import * as fs from "node:fs/promises"
import * as pup from "puppeteer"
import { fillTemplate } from "../utils/pdf"

export const generatePdf = async (template, configuration) => {
    return fs.readFile(template.path).then(async (data) => {
        const filled_template = await fillTemplate(data.toString(), configuration.replacementVars)
        const browser = await pup.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(filled_template)

        const pdf = await page.pdf({
            format: configuration.properties.format ?? "A4",
            margin: {
                top: configuration.properties.margin ?? "20px",
                left: configuration.properties.margin ?? "20px",
                right: configuration.properties.margin ?? "20px",
                bottom: configuration.properties.margin ?? "20px",
            },
            printBackground: true
        });
        // await fs.writeFile("./test/example.pdf", pdf)
        await browser.close()
        return pdf;
    })
}


