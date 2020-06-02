const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
import Sentence from "./sentence";
class Story {
    story:Sentence[]
    public async getLastSentence(lastPart:boolean,idUser:string) {
        if (lastPart) {
            const story = await storySchema.findOne({$expr:{$eql:[{$size:['$sentences']},'$storyLength']}},{$not:{$elemMatch:{$eql:{sentences:{user:idUser}}}}}, function (err, doc) {
                doc.full =true;
                doc.save();
            }).exec()
            if(story) {
                const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
                const lastSentence = senteces.cutLastSentence(senteces.text)
                return lastSentence
            }
        else{//Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
            return ''
            }
        }
    else {
            const story = await storySchema.findOne({$expr:{$and:{$not:{$eql:[{$size:['$sentences']},'$storyLength']}}}},{full:false}).exec()
            if(story) {
                const senteces = new Sentence(story.sentences.pop().user, story.sentences.pop().text)
                const lastSentence = senteces.cutLastSentence(senteces.text)
                return lastSentence
            }
    else{//Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        return ''
            }
         }
}
}
export default Story