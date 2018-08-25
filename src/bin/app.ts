import chalk from "chalk";
import * as commander from "commander";
import {Client as DiscordClient} from "discord.js";
import {config as configDotEnv} from "dotenv";
import axios from "axios";
import * as _ from "lodash";

// tslint:disable-next-line
const version = require("../../package.json").version;

interface Article {
    url: string;
}

interface ApiNewsResponse {
    status: string;
    articles: Article;
}

configDotEnv();

commander.version(version);

commander.command("send", "Send message to Discord");

commander.on("command:send", (message: string) => {

    console.log(chalk.yellow(`Sending '${message}'`));

    const client = new DiscordClient();

    client.on("ready", () => {
        console.log("I am ready!");
    });

    client.on("message", (message) => {
        if (message.content === "!ping") {
            message.channel.send("pong");
        }

        if (message.content === "!polygon") {
            const polygonApiKey = process.env.POLYGON_API_KEY;
            const polygonUrl = `https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=${polygonApiKey}`;
            axios.get(polygonUrl).then((response) => {
                const article: Article = _.head(response.data.articles) as Article;
                message.channel.send(article.url);
            }).catch((error) => {
                console.log(chalk.red(`Error retrieving polygon news, ${error}`));
            });
        }
    });

    client.login(process.env.BOT_TOKEN);

});

commander.parse(process.argv);

export default {
    test: true,
};
