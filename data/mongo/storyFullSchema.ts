const mongoose=require('mongoose')
const StoryFull_schema=mongoose.Schema;
const StoryFullschema = new StoryFull_schema({
    story: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('story_full', StoryFullschema)
export default StoryFullschema.methods;