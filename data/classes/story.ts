const storySchema=require('../mongo/storySchema');
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    lastSentence:Sentence
    storyId:string
    constructor(sentences:string[],storyId:string) {
        const text=sentences.pop()
        this.lastSentence=new Sentence(text)
        this.storyId=storyId
    }
    public getSentenceToWrite(story:Story) {
    const lastSentence =story.lastSentence.cutLastSentence(story.lastSentence)
        console.log(story.storyId)
    return {sentence:lastSentence,user:story.storyId}
}
}
export default Story