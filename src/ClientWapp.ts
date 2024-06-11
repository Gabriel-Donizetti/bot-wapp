import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { TextMessage } from './TextMessage';
import { ImageMessage } from './ImgMessage';

export default class ClientWapp {
    private c: Client;
    private txt: TextMessage;
    private img: ImageMessage;

    constructor() {
        this.c = new Client({
            authStrategy: new LocalAuth(),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
        });
  
        this.initialize();

        this.txt = new TextMessage(this.c)
        this.img = new ImageMessage(this.c)
    }

    private initialize() {
        this.c.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.c.on('authenticated', () => {
            console.log('Autenticado com sucesso!');
        });

        this.c.on('auth_failure', msg => {
            console.error('Falha na autenticação:', msg);
        });

        this.c.on('ready', () => {
            console.log('Client conectado!');
        });

        this.c.on('disconnected', (reason) => {
            console.log('Cliente desconectado:', reason);
        });

        this.c.initialize();
    }

    public get getClient() {
        return this.c;
    }

    public get getImg() {
        return this.img;
    }

    public get getTxt() {
        return this.txt;
    }
}
