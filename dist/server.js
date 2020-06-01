'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./connections/plugin");
const Hapi = require('hapi');
require('dotenv').config();
class Server {
    static async init() {
        try {
            const uri = process.env.MONGODB_URL;
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            const app = await new Hapi.server({
                host: process.env.HOST,
                port: process.env.PORT,
                routes: {
                    cors: {
                        credentials: true
                    }
                }
            });
            await plugin_1.default.graphql(app);
            //empiezo aplicacion
            await app.start();
            console.log('Server running on %s', app.info.uri);
        }
        catch (error) {
            console.error('here was something wrong:', error);
        }
    }
}
Server.init();
