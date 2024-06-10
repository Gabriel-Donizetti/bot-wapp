import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

interface Chat {
    name: string;
    id: Object;
}

export default class ClientWapp {
    private client: Client;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
        });

        this.initialize();
    }

    private initialize() {
        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('Client conectado!');
            this.getChats()
        });

        this.client.initialize();
    }

    private async getChats(): Promise<Chat[]> {
        console.log('Buscando chats')
        try {
            const chats = await this.client.getChats();
            const chat: Chat[] = chats.map(chat => {
                const contact = chat.name;
                return {
                    name: chat.name,
                    id: chat.id._serialized,
                };
            });
            console.log(chat)
            return chat;
        } catch (error) {
            console.error('Nenhum chat encontrado\n', error);
            return [];
        }
    }
}
