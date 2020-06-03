const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
import Sentence from "./sentence";
class Story {
    story:Sentence[]
}
export default Story