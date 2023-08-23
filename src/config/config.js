"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// include any local environment in the directory of the project
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_UPASSWORD = process.env.MONGO_UPASSWORD || '';
// the || '' is for ts to understand that the variable is a string not a null
const MONGO_URL = 'mongodb+srv://rimaalidev:rimaalidev@cluster0.aecy1rp.mongodb.net/';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
