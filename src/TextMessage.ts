import { Client } from "whatsapp-web.js";

export class TextMessage{
    c: Client

    constructor(c: Client){
        this.c = c
    }

    public async textMessage(to: string, msg: string): Promise<string> {
        const res = await this.c.sendMessage(to, msg)
        
        if (res.ack = -1) {
            return 'Falha ao enviar a mensagem para ' +  to
        } else {
            return 'Mensagem enviada para ' + to

        }
    }

    public async multTextMessage(to: Array<string>, msg: string){
        to.forEach(async to =>{
            const res = await this.c.sendMessage(to, msg)

            if (res.ack = -1) {
                return 'Falha ao enviar a mensagem para ' +  to
            } else {
                return 'Mensagem enviada para ' + to
    
            }
        })

    }
}