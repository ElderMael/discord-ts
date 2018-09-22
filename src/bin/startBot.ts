import {Client as DiscordClient} from "discord.js";
import {registerListenersTo} from "./registerListeners";

export const startBot = () => {

    const client = new DiscordClient();

    registerListenersTo(client);

    client.login(process.env.BOT_TOKEN).then((result) => {
        console.log(result);
    });

};