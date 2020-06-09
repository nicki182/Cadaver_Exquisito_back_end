import Story from "../data/classes/story";
import StoryFull from "../data/classes/storyFull";
const storySchema=require('../data/mongo/storySchema')
const storyFullSchema=require('../data/mongo/storyFullSchema')
async function update(sentence: string, storyId:string,user:string,storyMaxLength:number) {
    const story = await storySchema.findOneAndUpdate({id: storyId}).exec()
    story.sentences.push(sentence)
    story.user = user
    if (story.storyMaxLength == null) {
        await storySchema.add({storyMaxLength: storyMaxLength})
    }
    else if (story.sentences.length > story.storyMaxLength) {
        story.full = true
    }
    await story.save()
    return true
}
async function getLastSentence(user:string) {
    const storyQuery = await storySchema.findOne( {user:{$ne:user}},{full: false}).exec()
    if(storyQuery) {
        const story=new Story(storyQuery.sentences,storyQuery.user)
        const lastSentence=story.getSentenceToWrite(story)
        return lastSentence
    }
    else{//Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: ['This is my story...'],//la frase inicializada que le podemos dar
            full:false,
            user:'N/A'
        })
        await story.save()
        return {sentence:story.sentences.pop(),storyId:story.storyId}
    }
}
async function getStoryFull(call:number){
    const storyInSentences=storySchema.findOneAndRemove({full:true})
    if(storyInSentences!=null){
        const storyFull=new StoryFull(storyInSentences.sentences)
        return storyFull
    }
    else{
        const storyFull=storyFullSchema.findOne({id:call})
        return storyFull.story==null?'Sorry there are no more stories':storyFull.story
    }
}

export {
    update,
    getLastSentence,
    getStoryFull
}