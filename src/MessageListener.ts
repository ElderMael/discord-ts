import {Message} from "discord.js";

interface MessageListener {

    canProcess(msg: Message): boolean;

    process(msg: Message): Promise<any>;
}

class PingMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return msg.content === "!ping";
    }

    public process(msg: Message): Promise<any> {
        return msg.channel.sendMessage("pong!");
    }

}

export default MessageListener;

const listeners = [new PingMessageListener()] as MessageListener[];

export {listeners};