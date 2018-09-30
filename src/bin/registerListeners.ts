import {Message} from "discord.js";
import {Client as DiscordClient} from "discord.js";
import {listeners} from "../MessageListener";

export function registerListenersTo(client: DiscordClient) {

    client.on("message", (channelMessage: Message) => {

        listeners.forEach((listener) => {
            if (listener.canProcess(channelMessage)) {
                listener.process(channelMessage)
                    .then(console.info)
                    .catch(console.error);
            }

        });

    });
}
