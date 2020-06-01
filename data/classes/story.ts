const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    public async getLastSentence(lastPart:boolean,idUser:string) {
        if (lastPart) {
            const story = await storySchema.findOne({$expr:{$eql:[{$size:['$sentences']},'$storyLength'-1]}},{$not:{$elemMatch:{$eql:{sentences:{user:idUser}}}}}).exec()
            if(story) {
                const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
                const lastSentence = senteces.cutLastSentence(senteces.text)
                return lastSentence
            }
        else{
            return ''
            }
        }
    else {
            const story = await storySchema.findOne({$expr:{$and:{$not:{$eql:[{$size:['$sentences']},'$storyLength'-1]}}}},{$expr:{$not:{$eql:[{$size:['$sentences']},'$storyLength']}}}).exec()
            const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
            const lastSentence=senteces.cutLastSentence(senteces.text)
            return lastSentence
         }
}
}
export default Story