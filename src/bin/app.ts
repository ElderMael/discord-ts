import chalk from "chalk";
import * as commander from "commander";
import {Client as DiscordClient, Message} from "discord.js";
import {config as configDotEnv} from "dotenv";
import * as _ from "lodash";
import {postApiNewsUrl} from "./postApiNewsUrl";

// tslint:disable-next-line
const version = require("../../package.json").version;

configDotEnv();

commander.version(version);

commander.command("send", "Send message to Discord");

const sendMessage = (message: string) => {

    console.log(chalk.yellow(`Sending '${message}'`));

    const client = new DiscordClient();

    client.on("ready", () => {
        console.log("I am ready!");
    });

    client.on("message", (channelMessage: Message) => {
        const messageContent = channelMessage.content;

        if (messageContent === "!ping") {
            channelMessage.channel.send("pong");
        }

        if (_.includes(["!polygon", "!ars-technica"], messageContent)) {

            const website = messageContent.substring(1);
            postApiNewsUrl(website, channelMessage);
        }
    });

    client.login(process.env.BOT_TOKEN).then((result) => {
        console.log(result);
    });

};

commander.on("command:send", sendMessage);

if(process.argv.length === 2) {
    sendMessage("");
} else {
    commander.parse(process.argv);
}