import axios from 'axios';
import chalk from 'chalk';
import * as ora from 'ora';


export const showSpinner = (message: string) => {
    (async () => {
        try {

            let spinner = ora(message).start();

            let googlePayload = await axios.get("http://www.google.com/");
            spinner.stop();

            console.log(chalk.magentaBright("I just loaded google!"));

        } catch(error) {

        }
    })();
}
