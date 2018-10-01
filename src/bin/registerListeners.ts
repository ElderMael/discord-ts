import {Message} from "discord.js";
import {Client as DiscordClient} from "discord.js";
import {listeners} from "../MessageListener";

export function registerListenersTo(client: DiscordClient) {

    client.on("message", (message: Message) => {

        listeners.forEach((listener) => {
            if (listener.canProcess(message)) {
                listener.process(message)
                    .then(console.info)
                    .catch((error) => {
                        console.error(`Error while processing message '${message.content}':`, error);
                        message.channel.send("Ups! Error 😞");
                    });
            }

        });

    });
}
