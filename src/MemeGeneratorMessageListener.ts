import axios, {AxiosResponse} from "axios";
import {Attachment, Message} from "discord.js";
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
            const imageUrl = _.sample(response.data.result).instanceImageUrl;

            const imageAttachment = new Attachment(imageUrl);

            return msg.channel.send(imageAttachment);
        }).catch((error) => {
            console.log(`Error while retrieving meme from url '${memeGeneratorUrl}'`, error);
        });
    }

}