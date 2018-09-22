import * as commander from "commander";
import {config as configDotEnv} from "dotenv";
import {startBot} from "./startBot";

configDotEnv();

if (process.argv.length === 2) {
    startBot();
} else {
    // tslint:disable-next-line
    const version = require("../../package.json").version;

    commander.version(version);
    commander.command("send", "Send message to Discord");

    commander.parse(process.argv);
}
