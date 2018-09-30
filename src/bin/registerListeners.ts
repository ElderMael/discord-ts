import axios, {AxiosResponse} from "axios";
import chalk from "chalk";
import {Message} from "discord.js";
import {Client as DiscordClient} from "discord.js";
import * as _ from "lodash";
import {listeners} from "../MessageListener";

export function registerListenersTo(client: DiscordClient) {
    client.on("message", (channelMessage: Message) => {

        const messageContent = channelMessage.content;

        listeners.forEach((listener) => {
            if (listener.canProcess(channelMessage)) {
                listener.process(channelMessage)
                    .then(console.info)
                    .catch(console.error);
            }
        });

        if (messageContent.startsWith("!meme")) {
            const memeGeneratorApiKey = process.env.MEME_GENERATOR_API_KEY;

            const searchTerm: string = encodeURIComponent(messageContent.substring(6));

            const memeGeneratorUrl = "http://version1.api.memegenerator.net"
                + `//Instances_Search?q=${searchTerm}&pageIndex=0&pageSize=10&apiKey=${memeGeneratorApiKey}`;

            axios.get(memeGeneratorUrl).then((response: AxiosResponse<any>) => {
                const imageUrl = _.sample(response.data.result).instanceImageUrl;
                channelMessage.channel.send(imageUrl);
            }).catch((error) => {
                console.log(chalk.red(`Error retrieving meme: ${error}`));
            });

        }
    });
}
