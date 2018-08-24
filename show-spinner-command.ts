#!/usr/bin/env node

import * as commander from 'commander'
import chalk from 'chalk'

commander
    .version('0.0.1')
    .description("Discord CLI Using TypeScript");

commander
    .command("send")
    .alias("s")
    .action((message) => {
        console.log(chalk.yellow("Sending message to discord"));
    });

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    commander.outputHelp()
    process.exit()
}

commander.parse(process.argv)
