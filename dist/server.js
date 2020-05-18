'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
const Hapi = require('hapi');
class Server {
    static async init() {
        try {
            const uri = 'mongodb://127.0.0.1:27017/Cadaver_Exquisito';
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            const app = await new Hapi.server({
                host: '192.168.0.23',
                port: 3030,
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
