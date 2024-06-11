import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import Message from './Message';

interface Chat {
    name: string;
    id: Object;
}

export default class ClientWapp {
    private client: Client;
    private message: Message;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
        });

        this.message = new Message(this.client);

        // this.initialize()
    }

    public static async init(): Promise<ClientWapp> {
        const c = new ClientWapp();

        await c.client.initialize()

        return c
    }

    private async initialize() {
        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('Client conectado!');
            this.getChats()

            //this.message.imgMessage('554196261489@c.us', 'D:\\Projetos_\\bot-wapp\\img\\img.jpg')

        });

        await this.client.initialize();
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


    public get getClient() {
        return this.client
    }

    public get getMessage() {
        return this.message;
    }
}
