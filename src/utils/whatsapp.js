const { Client, LocalAuth} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")

class Messenger {

    constructor() {

        this.client = new Client({
            authStrategy: new LocalAuth(),
        })

        this.client.initialize()

        this.client.on("qr", (qr) => {

            qrcode.generate(qr, { small: true })

        })

        this.client.on("ready", () => {
            console.log("[INFO] Client is ready")
        })
    }

    async sendMessage(message) {
        await this.client.sendMessage("556584432583@c.us", message)
    }

}

module.exports = Messenger
