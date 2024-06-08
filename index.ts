import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';

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

client.on('ready', () => {
    console.log('Client conectado!');
});

client.on('message', msg => {
    if (msg.body === 'tico') {
        msg.reply(getReply());
    }
});

client.initialize();

function getReply() {
    const msg: string[] = ['tuco', 'teco', 'tico', 'tucando', 'tucava', 'tuquei', 'tucaivos', 'tucaras'];
    const ind: number = Math.floor(Math.random() * msg.length);
    return msg[ind];
}
