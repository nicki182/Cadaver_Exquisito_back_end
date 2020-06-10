'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_hapi_1 = require("apollo-server-hapi");
const typeDefs = apollo_server_hapi_1.gql `
type Query{
storyFull(call:Int):String
storyToAdd(userId:String):Sentence
     }
    type Mutation{
    storyUpdate(type:sentenceInput):Boolean
    }
    type Sentence{
    sentence:String,
    storyId:String
    }
    input sentenceInput{
    sentence:String,
    user:String,
    storyId:String,
    storyMaxLength:Int
    }
    `;
exports.default = typeDefs;
