'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server-hapi');
const typeDefs = gql `
type Query{
storyFull(call:Int):String
storyToAdd(edit:Int):String
     }
    type Mutation{
    storyUpdate(type:storyInput):Boolean
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
