import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import  Message  from './Message';


const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client conectado!');

    const msg = new Message(client)

    await msg.textMessage('554188939448@c.us', 'teste')
});

client.on('message', msg => {
    if (msg.body === 'tico') {
        msg.reply('teco');
    }
});

client.initialize();
