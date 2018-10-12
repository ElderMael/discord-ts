import {Message} from "discord.js";
import {Client as DiscordClient} from "discord.js";
import {listeners} from "../listeners/MessageListener";

export function registerListenersTo(client: DiscordClient) {

    client.on("message", (message: Message) => {

        listeners
            .filter(listener => listener.canProcess(message))
            .forEach(listener => {
                listener
                    .process(message)
                    .catch(error => {
                        console.error(`Error while processing message '${message.content}':`, error);
                        return message.channel.send("Ups! Error 😞");
                    });
            });


    });
}
