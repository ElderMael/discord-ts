import {Message} from "discord.js";
import MessageListener from "./MessageListener";

export class PingMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return msg.content === "!ping";
    }

    public process(msg: Message): Promise<any> {
        return msg.channel.sendMessage("pong!");
    }

}