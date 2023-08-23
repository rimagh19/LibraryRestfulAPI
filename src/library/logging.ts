import chalk from 'chalk';

const welcome = '\t╔╦═╦╦═╦╗╔═╦═╦═╦═╦═╗\n\t║║║║║╦╣║║╔╣║║║║║║╦╝\n\t║║║║║╩╣╚╣╚╣║║║║║║╩╗\n\t╚═╩═╩═╩═╩═╩═╩╩═╩╩═╝';
const welcome_2 = '╔═╦═╦═╦╦═╦╦═╦═╦══╦═╦══╗\n║╔╣║║║║║║║║╦╣╔╩╗╔╣╦╩╗╗║\n╚╣║║║║║║║║╩╣╚╗║║║╩╦╩╝║\n╚═╩═╩╩═╩╩═╩═╩═╝╚╝╚═╩══╝';
const start_message = '▀▄▀▄▀▄ CONNECTED TO DATABSE ▄▀▄▀▄▀';
export default class Logging {
    public static start = () => console.log(chalk.hex('#f073c4')(welcome), chalk.hex('#f073c4')('\n', start_message));

    public static log = (args: any) => console.log(chalk.bgCyan('[LOG] '), typeof args === 'string' ? chalk.white(args) : args);

    public static info = (args: any) => console.log(chalk.blue('[INFO] '), typeof args === 'string' ? chalk.blueBright(args) : args);

    public static warn = (args: any) => console.log(chalk.yellow('[WARN] '), typeof args === 'string' ? chalk.yellowBright(args) : args);

    public static error = (args: any) => console.log(chalk.red('[ERR]'), typeof args === 'string' ? chalk.redBright(args) : args);
}
