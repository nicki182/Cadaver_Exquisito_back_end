import Story from "./story";
const storySchema=require('../mongo/storySchema')
const storyFullSchema=require('../mongo/storyFullSchema')
class StoryFull {
    story: string

    constructor(storyInSentences?: [string], story?: string) {
        if (storyInSentences) {
            let story = ''
            while (storyInSentences != []) {
                story = storyInSentences.pop() + story
            }
            this.story = story
        } else {
            this.story = story
        }
    }
}
export default StoryFull