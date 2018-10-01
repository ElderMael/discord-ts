import {Collection, Message, Snowflake} from "discord.js";
import MessageListener from "./MessageListener";

export class ClearMessageListener implements MessageListener {

    public canProcess(msg: Message): boolean {
        return msg.content === "!clear";
    }

    public process(msg: Message): Promise<any> {

        const howMany = parseInt(msg.content.substring(6), 10) || 5;

        const guildMember = msg.guild.member(msg.author);

        if (
            !guildMember.hasPermission("ADMINISTRATOR") ||
            !guildMember.hasPermission("MANAGE_MESSAGES")
        ) {
            msg.author.send("clearing messages is prohibited for you!");
            return Promise.reject(new Error(`User '${msg.author.username}' attempted to clear \
                messages on channel ${msg.channel.toString()}`));
        }

        return msg.channel.fetchMessages({
            limit: howMany,
        }).then((messages: Collection<Snowflake, Message>) => {
            return messages.map((message) => message.delete());
        }).then((deletedMessages) => {
            const roles = guildMember.roles.map((role) => role.name);
            console.info(roles);
            console.info(`User ${msg.author.username} (${roles}) removed ${howMany} messages!`);
            return deletedMessages;
        });

    }

}
