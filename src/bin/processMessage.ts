import {Message} from "discord.js";
import * as _ from "lodash";
import {listeners} from "../listeners/MessageListener";

export const processMessage = (message: Message) => {

    const processors = _.filter(listeners, listener => listener.canProcess(message));

    const processorResults = _.map(processors, listener => listener.process(message));

    _.forEach(processorResults, result => result.catch(error => {
        console.error(`Error while processing message '${message.content}':`, error);
        return message.channel.send("Ups! Error 😞");
    }));

};