import {Client as DiscordClient} from "discord.js";
import {registerListenersTo} from "./registerListeners";


const client = new DiscordClient();

client
    .login(process.env.BOT_TOKEN)
    .then((token) => {
        registerListenersTo(client);
        console.log("ElderBot started.")
    });
