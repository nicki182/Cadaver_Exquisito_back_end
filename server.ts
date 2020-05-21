'use strict'
import Plugins from "./plugin";
const Hapi=require('hapi');
class Server {
    public static async init(): Promise<any> {
        try {
            const uri = 'mongodb://127.0.0.1:27017/Cadaver_Exquisito';
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
            const app = await new Hapi.server({
                host: '192.168.0.23',
                port:3030,
                routes: {
                    cors:{
                        credentials: true
                    }
                }
            });
            await Plugins.graphql(app);
            //empiezo aplicacion
            await app.start();
            console.log('Server running on %s', app.info.uri);
        } catch (error) {
            console.error('here was something wrong:', error);
        }
    }
}
Server.init();