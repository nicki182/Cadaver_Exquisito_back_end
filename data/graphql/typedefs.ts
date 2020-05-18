'use strict'
const {gql }=require('apollo-server-hapi')
const typeDefs = gql`
type Query{
storyFull:String
     }
    type Mutation{
    storyUpsert(type:storyInput):String
    }
    type Story{
   story:String,
    edit:Int
    },
    input storyInput{
    story:String,
    edit:Int!,
    add:String
    }
    `
export default typeDefs;