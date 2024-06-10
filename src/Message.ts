import { Client, MessageMedia, Poll } from 'whatsapp-web.js';


interface Options {
    name: string
    localId: number
}

export default class Message {
    client: Client;

    constructor(client: Client) {
        this.client = client
    }

    public async textMessage(to: string, msg: string): Promise<string> {
        const res = await this.client.sendMessage(to, msg)
        
        if (res.ack = -1) {
            return 'Falha ao enviar a mensagem'
        } else {
            return 'Mensagem enviada'

        }
    }

    public async imgMessage(to: string, msg: string): Promise<string> {
        const res = await this.client.sendMessage(to, MessageMedia.fromFilePath(msg))

        if (res.ack) {
            return 'Imagem enviada'
        } else {
            return 'Falha ao enviar imagem'
        }
    }

    public async audioMessage(to: string, msg: string): Promise<string> {
        const res = await this.client.sendMessage(to, MessageMedia.fromFilePath(msg))

        if (res.ack) {
            return 'Audio enviado'
        } else {
            return 'Falha ao enviar audio'
        }
    }

    public async pollMessage(to: string, title: string, pollOptios: Array<Options>, msgSecret: Array<number>, multAnswer: boolean): Promise<string> {
        const poll: Poll = {
            pollName: title,
            pollOptions: pollOptios,
            options: {
                messageSecret: msgSecret,
                allowMultipleAnswers: multAnswer
            }
        }

        const res = await this.client.sendMessage(to, poll)

        if (res.ack) {
            return 'Enquete enviada'
        } else {
            return 'Falha ao enviar enquete'
        }
    }

}