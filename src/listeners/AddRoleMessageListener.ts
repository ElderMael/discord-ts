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

        const guildRole = msg.guild.roles.filter(r => r.name.includes(role));


        if (!guildRole) {
            const roles = msg.guild.roles
                .map(r => r.name)
                .join(',');
            return msg.channel.send(`Role not found ${role}, valid roles are: ${roles}`);
        }


        let guildMember = msg.mentions.users.first();

        if (!guildMember) {
            return msg.channel.send(`User does not exist ${user}`);
        }

        return msg.guild
            .member(guildMember)
            .addRole(guildRole)
            .then(() => {
                return msg.channel.send(`Added role ${role} to user ${user}`);
            }).catch(error => {
                return msg.channel.send(`Error adding role ${role} to user ${user}`)
            });
    }

}