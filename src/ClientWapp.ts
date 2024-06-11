// ClientWapp.ts
import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { TextMessage } from "./TextMessage";
import { ImageMessage } from "./ImgMessage";

export default class ClientWapp {
  private c: Client;
  private txt: TextMessage;
  private img: ImageMessage;
  private status: String;

  constructor() {
    this.c = new Client({
      authStrategy: new LocalAuth(),
      webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
    });

    this.status = "disconnected";

    this.initialize();

    this.txt = new TextMessage(this.c);
    this.img = new ImageMessage(this.c);
  }

  private initialize() {
    this.c.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
        this.status = "qr";
    });

    this.c.on("authenticated", () => {
      console.log("Autenticado com sucesso!");
      this.status = "authenticated";
    });

    this.c.on("auth_failure", (msg) => {
      console.error("Falha na autenticação:", msg);
      this.status = "auth_failure";
    });

    this.c.on("ready", () => {
      console.log("Client conectado!");
        this.status = "ready";
    });

    this.c.on("disconnected", (reason) => {
      console.log("Cliente desconectado:", reason);
        this.status = "disconnected";
    });

    this.c.initialize();
  }

  public get getClient() {
    return this.c;
  }

    public get getStatus() {
        return this.status;
    }

  public get getImg() {
    return this.img;
  }

  public get getTxt() {
    return this.txt;
  }
}
