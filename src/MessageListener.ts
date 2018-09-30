import {Message} from "discord.js";
import {ApiNewsMessageListener} from "./ApiNewsMessageListener";
import {PingMessageListener} from "./PingMessageListener";

interface MessageListener {

    canProcess(msg: Message): boolean;

    process(msg: Message): Promise<any>;
}

export default MessageListener;

const listeners = [
    new PingMessageListener(),
    new ApiNewsMessageListener(),
] as MessageListener[];

export {listeners};
