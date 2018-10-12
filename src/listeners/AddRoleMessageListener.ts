import {Message} from "discord.js";
import MessageListener from "./MessageListener";

export class AddRoleMessageListener implements MessageListener {
    canProcess(msg: Message): boolean {
        return msg.content.startsWith('!add-role');
    }

    process(msg: Message): Promise<any> {

        const [command, user, role] = msg.content.split(' ');

        if (command && user && role) {
            const guildRole = msg.guild.roles.find('name', role);

            if (!guildRole) {
                return msg.channel.send(`Role not found ${guildRole}`);
            }

            return msg.guild.member(user).addRole(guildRole).then(() => {
                return msg.channel.send(`Added role ${role} to user ${user}`);
            }).catch(error => {
                return msg.channel.send(`Error adding role ${role} to user ${user}`)
            });
        }

        return Promise.reject(`Invalid command: ${msg.content} `);
    }

}