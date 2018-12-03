import 'reflect-metadata';
import ApiServer from './server';
import {DatabaseProvider} from './db';
const dotenv = require('dotenv');

dotenv.config();

DatabaseProvider.configure({ //TODO: needs to come from .env
    type: process.env.DATABASE_TYPE as any || 'postgres',
    database: process.env.DATABASE_NAME || 'weekendpret',
    username: process.env.DATABASE_USERNAME || 'weekendpret',
    password: process.env.DATABASE_PASSWORD || 'weekendpret',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    ssl: !!process.env.USE_SSL
});

const server = new ApiServer();
server.start(+process.env.PORT || 8080);