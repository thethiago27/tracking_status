const puppeteer = require('puppeteer');
const {getLog, createLog} = require("./utils/log")
const Messenger = require("./utils/whatsapp");

const messenger = new Messenger();

const scrapping = async () => {

    const url = "https://br.octoshop.com/rastreio/info?code=NA144256872BR"

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const options = await page.$$eval('div.checkpoints-wrapper > div.checkpoint', (options) =>
        options.map((option) => option.textContent)
    );

    const regexToRemove = /\s+/g;
    const text = options.map((option) => option.replace(regexToRemove, ' '));

    const data = text.map((option) => {
        const split = option.split("Dia")

        return {
            status: split[0].trim(),
            date: split[1].trim()
        }
    })

    const logSize = await getLog();

    if (data.length > logSize.length) {
        await createLog(data)
        await messenger.sendMessage(`Novo status: ${data[0].status}\nData: ${data[0].date}\nacompanhe através do link: ${url}`)
    }

    const date = new Date();
    const atualDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    console.log(`[${atualDate}][INFO] Fetched data from Octoshop `);

    await browser.close();
}

// Run the scrapping at every 5 minutes
setInterval(scrapping, 300000);
