'use strict'
const {gql }=require('apollo-server-hapi')
const typeDefs = gql`
type Query{
storyFull(call:Int):String
storyToAdd(text:string,user:string):String
     }
    type Mutation{
    storyUpdate(type:sentenceInput):Boolean
    storyCreate(type:
    }
    type Sentence{
    sentence:String,
    user:String
    },
    input sentenceInput{
    sentence:String,
    user:String
    }
    input storyInput{
     sentence:String
     user:String
     maxLength:Number
    }
    `
export default typeDefs;