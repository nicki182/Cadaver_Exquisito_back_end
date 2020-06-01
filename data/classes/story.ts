const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
import Sentence from "./sentence";
class Story {
    //Me falta que busque el ultimo usuario son distintos
    public async getLastSentence(lastPart:boolean,idUser:string) {
        if (lastPart) {
            const story = await storySchema.findOne().$where('this.story.sentences.length-1==this.storyLength').exec()
            const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
            const lastSentence=senteces.cutLastSentence(senteces.text)
            return lastSentence
        }
    else {
            const story = await storySchema.findOne().$where('this.story.sentences.length!=this.storyLength').exec()
            const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
            const lastSentence=senteces.cutLastSentence(senteces.text)
            return lastSentence
         }
}
}
export default Story