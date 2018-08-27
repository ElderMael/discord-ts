import axios, {AxiosResponse} from "axios";
import chalk from "chalk";
import {Message} from "discord.js";
import * as _ from "lodash";
import {ApiNewsResponse} from "./apiNewsResponse";
import {Article} from "./article";

export function postApiNewsUrl(website: string, channelMessage: Message): void {
    const polygonApiKey = process.env.POLYGON_API_KEY;

    const polygonUrl = `https://newsapi.org/v2/top-headlines?sources=${website}&apiKey=${polygonApiKey}`;

    axios.get(polygonUrl).then((response: AxiosResponse<ApiNewsResponse>) => {
        const article: Article = _.sample(response.data.articles);
        channelMessage.channel.send(article.url);
    }).catch((error) => {
        console.log(chalk.red(`Error retrieving polygon news, ${error}`));
    });
}
