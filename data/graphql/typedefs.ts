'use strict'
const {gql }=require('apollo-server-hapi')
const typeDefs = gql`
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
    storyId:String
    }
    input storyInput{
     sentence:String
     user:String
     maxLength:Int
    }
    `
export default typeDefs;