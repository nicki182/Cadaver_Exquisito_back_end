'use strict'
import Plugins from "./connections/plugin";
import * as Hapi from 'hapi';
require('dotenv').config();
class Server {
    public static async init(): Promise<any> {
        try {
            const uri = process.env.MONGODB_URL
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true,
                useFindAndModify:false
            })
            const app = await new Hapi.server({
                host: process.env.HOST,
                port:process.env.PORT,
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