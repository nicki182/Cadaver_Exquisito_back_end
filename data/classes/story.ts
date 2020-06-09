const storySchema=require('../mongo/storySchema');
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    storyId:string
    sentencesAmount:number
    constructor(sentences:[string],storyId:string) {
        if(sentences.length<15) {
            this.sentencesAmount = sentences.length
            const lastSentence=new Sentence(sentences.pop())
            let sentencesList=[lastSentence]
            sentences.map((sentences)=>{
                const sentence=new Sentence(sentences)
                sentencesList.push(sentence)})
            this.story=sentencesList
            this.storyId = storyId
        }
    }
    public getSentenceToContinue(story:Story) {
    const lastSentence =story.story.pop()
        lastSentence.cutLastSentence(lastSentence)
        const storyId=story.storyId
        this.sentencesAmount--
    return {sentence:lastSentence.text,storyId:storyId}
}
}
export default Story