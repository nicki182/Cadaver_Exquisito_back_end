import {GraphQLString} from "graphql";

const mongoose=require('mongoose')
const StorySchema=mongoose.Schema;
const Storyschema = new StorySchema({
    sentences:{
            type:[String],
            required: true
    },
    storyMinLength:{
        type:Number,
        required: true
    },
    full:{
        type:Boolean,
        required:true
    },
    length:{
        type:Number,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('story', Storyschema)
export default Storyschema.methods;