const storySchema=require('../mongo/storySchema');
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    lastSentence:Sentence
    storyId:string
    constructor(sentences:string[],storyId:string) {
        while(sentences!=[]){
            const sentence=new Sentence(sentences.pop())
           this.story.push(sentence)
        }
        this.storyId=storyId
    }
    public getSentenceToWrite(story:Story) {
    const lastSentence =story.story.pop()
        lastSentence.cutLastSentence(lastSentence)
        const storyId=story.storyId
    return {sentence:lastSentence,storyId:storyId}
}
}
export default Story