import * as Hapi from 'hapi';
import {ApolloServer} from 'apollo-server-hapi' ;
import typeDefs from "../data/graphql/typedefs";
import resolvers from "../data/graphql/resolvers";

export default class Plugins {

    public static async graphql(app: Hapi.Server): Promise<Error | any> {
        try {
            const server = new ApolloServer({
                typeDefs,
                resolvers,
                debug: true
            } as any);

            await server.applyMiddleware({app});

            await server.installSubscriptionHandlers(app.listener);

        } catch (error) {
            console.log(`Plugins - Ups, something went wrong when registering graphql plugin: ${error.message}`);
        }
    }
}