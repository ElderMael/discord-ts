import axios, {AxiosResponse} from "axios";
import {Message} from "discord.js";
import * as _ from "lodash";
import MessageListener from "./MessageListener";

const memeGeneratorApiKey = process.env.MEME_GENERATOR_API_KEY.trim();

export class MemeGeneratorMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return msg.content.startsWith("!meme");
    }

    public process(msg: Message): Promise<any> {

        const searchTerm: string = encodeURIComponent(msg.content.substring(6));

        const memeGeneratorUrl = "http://version1.api.memegenerator.net"
            + `//Instances_Search?q=${searchTerm}&pageIndex=0&pageSize=10&apiKey=${memeGeneratorApiKey}`;

        return axios.get(memeGeneratorUrl).then((response: AxiosResponse<any>) => {
            const results = response.data.result as any[];

            if (!results.length) {
                return msg.channel.send(
                    "http://www.sco.tt/.a/6a00d8357e4fe369e201b7c8def70d970b-800wi",
                );
            }

            const imageUrl = _.sample(results).instanceImageUrl;

            return msg.channel.send(imageUrl);
        }).catch((error) => {
            console.log(`Error while retrieving meme from url '${memeGeneratorUrl}'`, error);
            throw error;
        });
    }

}
