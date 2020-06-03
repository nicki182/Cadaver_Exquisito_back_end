import User from "./user";
const storySchema=require('../mongo/storySchema')
class sentence{
    text:string
    constructor(text:string) {
        this.text=text
    }
    cutLastSentence(story: string) {
        let sentences
        if (story.length <= 50) {
            return story
        } else {
            if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
                sentences = story.substring(story.lastIndexOf('.'))
                return sentences
            } else {
                sentences = story.substring(story.length - 50, story.length)
                return sentences
            }
        }
    }
}
export default sentence