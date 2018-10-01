import axios, {AxiosResponse} from "axios";
import {Message} from "discord.js";
import * as _ from "lodash";
import {ApiNewsResponse} from "./bin/apiNewsResponse";
import {Article} from "./bin/article";
import MessageListener from "./MessageListener";

const polygonApiKey = process.env.POLYGON_API_KEY;

export class ApiNewsMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return _.includes(["!polygon", "!ars-technica"], msg.content);
    }

    public process(msg: Message): Promise<any> {
        const website = msg.content.substring(1);

        const apiNewsUrl = `https://newsapi.org/v2/top-headlines?sources=${website}&apiKey=${polygonApiKey}`;

        return axios.get(apiNewsUrl).then((response: AxiosResponse<ApiNewsResponse>) => {
            const article: Article = _.sample(response.data.articles);
            msg.channel.send(article.url);
        });
    }

}
