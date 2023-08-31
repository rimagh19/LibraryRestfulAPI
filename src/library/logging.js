"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const welcome = '\t╔╦═╦╦═╦╗╔═╦═╦═╦═╦═╗\n\t║║║║║╦╣║║╔╣║║║║║║╦╝\n\t║║║║║╩╣╚╣╚╣║║║║║║╩╗\n\t╚═╩═╩═╩═╩═╩═╩╩═╩╩═╝';
const welcome_2 = '╔═╦═╦═╦╦═╦╦═╦═╦══╦═╦══╗\n║╔╣║║║║║║║║╦╣╔╩╗╔╣╦╩╗╗║\n╚╣║║║║║║║║╩╣╚╗║║║╩╦╩╝║\n╚═╩═╩╩═╩╩═╩═╩═╝╚╝╚═╩══╝';
const start_message = '▀▄▀▄▀▄ CONNECTED TO DATABSE ▄▀▄▀▄▀';
const pong_message = "•?((¯°·._.• 🏆🔥  𝓅𝐎η𝔤  🐉⛵ •._.·°¯))؟•' ";
class Logging {
}
Logging.pong = () => console.log(chalk_1.default.hex('#f073c4')(welcome), chalk_1.default.hex('#f073c4')('\n', pong_message));
Logging.start = () => console.log(chalk_1.default.hex('#f073c4')(welcome), chalk_1.default.hex('#f073c4')('\n', start_message));
Logging.log = (args) => console.log(chalk_1.default.bgCyan('[LOG] '), typeof args === 'string' ? chalk_1.default.white(args) : args);
Logging.info = (args) => console.log(chalk_1.default.blue('[INFO] '), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
Logging.warn = (args) => console.log(chalk_1.default.yellow('[WARN] '), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
Logging.error = (args) => console.log(chalk_1.default.red('[ERR]'), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
exports.default = Logging;
