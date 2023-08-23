import dotenv from 'dotenv';
dotenv.config();
// include any local environment in the directory of the project

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_UPASSWORD = process.env.MONGO_UPASSWORD || '';
// the || '' is for ts to understand that the variable is a string not a null

const MONGO_URL = 'mongodb+srv://rimaalidev:rimaalidev@cluster0.aecy1rp.mongodb.net/';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
