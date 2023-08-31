import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';

import authorRoutes from './routers/authorRouter';
import bookRoutes from './routers/bookRouter';
import libraryRoutes from './routers/LibraryRouters';

const router = express();

/** connect to mongoose */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.start();
        startServer();
    })
    .catch((error) => {
        Logging.error('UNABLE TO CONNECT');
    });

/** restful API only starts if connected to dtabase */
const startServer = () => {
    router.use((req, res, next) => {
        /** log the request */
        Logging.info(`INCOMING -> METHOD: ${req.method} - URL:${req.url} - IP: ${req.ip} STATUS: ${res.statusCode}`);
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //RULES OF API`S
    router.use((req, res, next) => {
        //these requests can come from any where
        res.header('Access-Control-Allow-Origin', '*'); //any domain (origin0 can access the resource)
        //specifying the HTTP headers that can be used when making the actual request
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        // what HTTP methods and headers are allowed by the server.
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            res.status(200).json({});
        }
        next();
    });

    /** Routes */
    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);
    router.use('/libraries', libraryRoutes);
    /** HealthCheck  */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: '•?((¯°·._.• 🏆🔥  𝓅𝐎η𝔤  🐉⛵ •._.·°¯))؟•' });
        Logging.pong();
    });

    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};
