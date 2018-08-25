import * as commander from 'commander';
import chalk from 'chalk';

const version = require('../../package.json').version;

commander.version(version);

commander.command('send', 'Send message to Discord');


commander.on('command:send', (message: string) => {

    console.log(chalk.yellow(`Sending '${message}'`));

});

commander.parse(process.argv);