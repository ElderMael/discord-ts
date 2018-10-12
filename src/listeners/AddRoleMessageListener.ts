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

        const guildRole = msg.guild.roles.filter(r => r.name.includes(role)).first();


        if (!guildRole) {
            const roles = msg.guild.roles
                .map(r => r.name)
                .join(',');
            return msg.channel.send(`Role not found ${role}, valid roles are: ${roles}`);
        }


        let guildUser = msg.mentions.users.first();

        if (!guildUser) {
            return msg.channel.send(`User does not exist ${user}`);
        }

        let guildMember = msg.guild
            .member(guildUser);

        if (!guildMember.hasPermission("ADMINISTRATOR")) {
            return msg.channel.send(`You do not have rights for this!`);
        }

        return guildMember
            .addRole(guildRole)
            .then(() => {
                return msg.channel.send(`Added role ${role} to user ${user}`);
            }).catch(error => {
                console.log(error);
                return msg.channel.send(`Error adding role ${role} to user ${user}`)
            });
    }

}