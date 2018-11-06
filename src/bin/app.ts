import {Client as DiscordClient} from "discord.js";
import * as _ from "lodash";
import {processMessage} from "./processMessage";


const client = new DiscordClient();

client
    .login(process.env.BOT_TOKEN)
    .then((token) => {

        // Had to add this type because `bind` return type is `any`
        const on = client.on.bind(client) as (type: string, callback: (event: any) => any) => any;

        _.curry(on)("message")(processMessage);
        console.log("ElderBot started.")
    });
