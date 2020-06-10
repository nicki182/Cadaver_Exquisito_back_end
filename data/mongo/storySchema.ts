const mongoose=require('mongoose')
const StorySchema=mongoose.Schema;
const Storyschema = new StorySchema({
    sentences:{
            type:[String],
            required: true
    },
    storyMax:{
        type:Number
    },
    full:{
        type:Boolean,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('story', Storyschema)
export default Storyschema.methods;