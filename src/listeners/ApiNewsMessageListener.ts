import axios, {AxiosResponse} from "axios";
import {Message} from "discord.js";
import * as _ from "lodash";
import {ApiNewsResponse} from "../apis/news/apiNewsResponse";
import {Article} from "../bin/article";
import MessageListener from "./MessageListener";

export class ApiNewsMessageListener implements MessageListener {

    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public canProcess(msg: Message): boolean {
        return _.includes(["!polygon", "!ars-technica"], msg.content);
    }

    public process(msg: Message): Promise<any> {
        const website = msg.content.substring(1);

        const apiNewsUrl = `https://newsapi.org/v2/top-headlines?sources=${website}&apiKey=${this.apiKey}`;

        return axios.get(apiNewsUrl).then((response: AxiosResponse<ApiNewsResponse>) => {
            const article: Article = _.sample(response.data.articles);
            msg.channel.send(article.url);
        });
    }

}
