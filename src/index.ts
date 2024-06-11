// Main.ts
import ClientWapp from './ClientWapp';

class Main {
    public static async main() {
        const c = new ClientWapp();

        // Aguarda a inicialização do cliente
        // await new Promise<void>((resolve) => {
        //     c.getClient.on('ready', () => {
        //         resolve();
        //     });
        // });

        console.log('Status:', c.getStatus);

        if(c.getStatus == 'ready') {
            await c.getTxt.textMessage('554197825044@c.us', 'funcionou essa bomba, manda uma img pra teste');
        }

        // await c.getImg.downloadImage(); // Supondo que `downloadImage` seja um método assíncrono
    }
}

// Chama o método main
Main.main();