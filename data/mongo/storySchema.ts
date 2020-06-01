import {GraphQLString} from "graphql";

const mongoose=require('mongoose')
const StorySchema=mongoose.Schema;
const Storyschema = new StorySchema({
    sentences:{
        type:[{user:String,text:String}],
        required:true
    },
    storyLength:{
        type:Number,
        required: true
    },
})
module.exports = mongoose.model('story', Storyschema)
export default Storyschema.methods;