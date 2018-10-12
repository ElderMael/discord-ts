import {Message} from "discord.js";
import MessageListener from "./MessageListener";

export class AddRoleMessageListener implements MessageListener {
    canProcess(msg: Message): boolean {
        return msg.content.startsWith('!add-role');
    }

    process(msg: Message): Promise<any> {

        const [command, user, role] = msg.content.split(' ');

        if (!(command && user && role)) {
            return Promise.reject(`Invalid command: ${msg.content} `);
        }

        const guildRole = msg.guild.roles.find('name', role);


        if (!guildRole) {
            const roles = msg.guild.roles
                .map(r => r.name)
                .join(',');
            return msg.channel.send(`Role not found ${role}, valid roles are: ${roles}`);
        }

        return msg.guild
            .member(user)
            .addRole(guildRole)
            .then(() => {
                return msg.channel.send(`Added role ${role} to user ${user}`);
            }).catch(error => {
                return msg.channel.send(`Error adding role ${role} to user ${user}`)
            });
    }

}