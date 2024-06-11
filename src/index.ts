// Main.ts
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from "qrcode-terminal";
import { TextMessage } from './TextMessage';
import { ImageMessage } from './ImgMessage';


class Main {
    public static async main() {
        const c = new Client({
            authStrategy: new LocalAuth(),
            webVersionCache: {
                type: "remote",
                remotePath:
                  "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
              },
        });

        c.on('ready', async () => {
            console.log('Client is ready!');

            const txt = new TextMessage(c)
            const img = new ImageMessage(c)

            //console.log(await c.getChats())

            const a = ['120363307880892227@g.us', '120363307880892227@g.us', '120363307880892227@g.us', '120363307880892227@g.us', '120363307880892227@g.us', '120363307880892227@g.us']

            txt.multTextMessage(a, 'multi mensagens')

            img.sendImage('120363307880892227@g.us', 'src/img/1718124595718_undefined.jpeg')
            img.downloadImage()

        });

        c.on("authenticated", () => {
            console.log("Autenticado com sucesso!");
          });
      
        c.on("auth_failure", (msg) => {
            console.error("Falha na autenticação:", msg);
          });

        c.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        c.initialize();
    }
}

Main.main();