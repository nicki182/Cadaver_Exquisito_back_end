const storySchema=require('../mongo/storySchema');
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    lastSentence:Sentence
    storyId:string
    public async getStory(user:string,story:Story){
        const storyS = await storySchema.findOne({expr: {$ne: {user: user}}, full: false}).exec()
        const text=storyS.sentences.pop()
        const sentence=new Sentence(text)
        story.lastSentence=sentence
        story.storyId=storyS.id
        return story
    }
    public getSentenceToWrite(story:Story) {
        console.log(story)
    const lastSentence =story.lastSentence.cutLastSentence(story.lastSentence)
        const storyId=story.storyId
    return {sentence:lastSentence,storyId:storyId}
}
}
export default Story