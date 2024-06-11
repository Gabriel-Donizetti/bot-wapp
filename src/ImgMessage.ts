import { Client, MessageMedia } from "whatsapp-web.js"
import fs from 'fs';
import path from 'path';

export class ImageMessage{
    c: Client

    constructor(c: Client){
        this.c = c
    }

    public async sendImage(to: string, msg: string): Promise<string>{
        const res = await this.c.sendMessage(to, MessageMedia.fromFilePath(msg))

        if (res.ack) {
            return 'Imagem enviada'
        } else {
            return 'Falha ao enviar imagem'
        }
    }

    public async downloadImage(msg: any): Promise<void> {
        if (msg.hasMedia) {
            try {
                const media = await msg.downloadMedia();
                const filePath = path.join(__dirname, 'img', `${Date.now()}_${media.filename}`);
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, media.data, { encoding: 'base64' });
                console.log(`Imagem salva em ${filePath}`);
            } catch (error) {
                console.error('Erro ao baixar imagem:', error);
            }
        } else {
            console.log('Nenhuma mídia encontrada na mensagem.');
        }
    }
}