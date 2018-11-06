import {Message} from "discord.js";
import {Client as DiscordClient} from "discord.js";
import {listeners} from "../listeners/MessageListener";
import * as _ from "lodash";

export function registerListenersTo(client: DiscordClient) {

    client.on("message", (message: Message) => {

        const processors = _.filter(listeners, listener => listener.canProcess(message));

        const processorResults = _.map(processors, listener => listener.process(message));

        _.forEach(processorResults, result => result.catch(error => {
            console.error(`Error while processing message '${message.content}':`, error);
            return message.channel.send("Ups! Error 😞");
        }));

    });
}
