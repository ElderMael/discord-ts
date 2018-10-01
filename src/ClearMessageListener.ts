import {Collection, Message, Snowflake} from "discord.js";
import MessageListener from "./MessageListener";

export class ClearMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return msg.content === "!clear";
    }

    public process(msg: Message): Promise<any> {
        return msg.channel.fetchMessages({
            limit: 100,
        }).then((messages: Collection<Snowflake, Message>) => {
            return messages.map((message) => message.delete());
        });
    }

}
