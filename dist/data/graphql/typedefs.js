'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server-hapi');
const typeDefs = gql `
type Query{
storyFull:String
     }
    type Mutation{
    storyUpdate(type:storyInput):String
    }
    type Story{
   story:String,
    edit:Int
    },
    input storyInput{
    story:String,
    edit:Int,
    add:String
    }
    `;
exports.default = typeDefs;
