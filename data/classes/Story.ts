import Sentence from "./Sentence";
class Story {
    story:Sentence[]
    storyId:string
    sentencesAmount:number
    constructor(sentences:[string],storyId:string) {
        if(sentences.length<15) {
            this.sentencesAmount = sentences.length
            const lastSentence=new Sentence(sentences.pop())
            const story=[lastSentence]
            sentences.map((sentences)=>{
                const sentence=new Sentence(sentences)
                story.push(sentence)})
            this.story=story
            this.storyId= storyId
        }
    }
    public getSentenceToContinue(story:Story) {
        const lastSentence = story.story.pop()
        lastSentence.cutLastSentence(lastSentence)
        const storyToContinue = {
            last_sentence: lastSentence,
            storyId: story.storyId
        }

        this.sentencesAmount= this.sentencesAmount - 1
        return storyToContinue
    }
}
export default Story