import {Message} from "discord.js";
import MessageListener from "./MessageListener";

export class AddRoleMessageListener implements MessageListener {
    canProcess(msg: Message): boolean {
        return msg.content.startsWith('!add-role');
    }

    process(msg: Message): Promise<any> {

        const [command, user, role] = msg.content.split(' ');

        if (command && user && role) {
            return msg.guild.member(user).addRole(role);
        }

        return Promise.reject(`Invalid command: ${msg.content} `);
    }

}