"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_hapi_1 = require("apollo-server-hapi");
const typedefs_1 = require("../data/graphql/typedefs");
const resolvers_1 = require("../data/graphql/resolvers");
class Plugins {
    static async graphql(app) {
        try {
            const server = new apollo_server_hapi_1.ApolloServer({
                typeDefs: typedefs_1.default,
                resolvers: resolvers_1.default,
                debug: true
            });
            await server.applyMiddleware({ app });
            await server.installSubscriptionHandlers(app.listener);
        }
        catch (error) {
            console.log(`Plugins - Ups, something went wrong when registering graphql plugin: ${error.message}`);
        }
    }
}
exports.default = Plugins;
