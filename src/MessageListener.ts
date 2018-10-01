import {Message} from "discord.js";
import {ApiNewsMessageListener} from "./ApiNewsMessageListener";
import {MemeGeneratorMessageListener} from "./MemeGeneratorMessageListener";
import {PingMessageListener} from "./PingMessageListener";
import {ClearMessageListener} from "./ClearMessageListener";

interface MessageListener {

    canProcess(msg: Message): boolean;

    process(msg: Message): Promise<any>;
}

export default MessageListener;

const listeners = [
    new PingMessageListener(),
    new ApiNewsMessageListener(),
    new MemeGeneratorMessageListener(),
    new ClearMessageListener(),
] as MessageListener[];

export {listeners};
