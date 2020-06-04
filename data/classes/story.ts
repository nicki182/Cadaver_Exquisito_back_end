const storySchema=require('../mongo/storySchema');
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    lastSentence:Sentence
    storyId:string
    public async getStory(user:string){
        const story = await storySchema.findOne({expr: {$ne: {user: user}}, full: false}).exec()
        const text=story.sentences.pop()
        const sentence=new Sentence(text)
        this.lastSentence=sentence
        this.storyId=story.id
    }
    public getSentenceToWrite(story:Story) {
    const lastSentence =story.lastSentence.cutLastSentence(story.lastSentence)
    return {sentence:lastSentence,user:story.storyId}
}
}
export default Story