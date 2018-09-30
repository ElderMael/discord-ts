import * as commander from "commander";
import {config as configDotEnv} from "dotenv";
import {Client as DiscordClient} from "discord.js";
import {registerListenersTo} from "./registerListeners";

configDotEnv();

if (process.argv.length === 2) {
    const client = new DiscordClient();

    registerListenersTo(client);

    client.login(process.env.BOT_TOKEN).then((result) => {
        console.log(result);
    });
} else {
    // tslint:disable-next-line
    const version = require("../../package.json").version;

    commander.version(version);
    commander.command("send", "Send message to Discord");

    commander.parse(process.argv);
}
