import Story from "../data/classes/Story";
import StoryFull from "../data/classes/StoryFull";
const storyFullSchema=require('../data/mongo/storyFullSchema')
const storySchema=require('../data/mongo/storySchema')
async function update(sentence: string, storyId:string,user:string,storyMax:number) {
    const story = await storySchema.findOneAndUpdate({id: storyId}).exec()
    story.sentences.push(sentence)
    story.user = user
    if (story.storyMax) {
        await storySchema.add({storyMax: storyMax})
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
        const lastSentence=story.getSentenceToContinue(story)
        return lastSentence
    }
    else{
        const story = new storySchema({
            sentences: ['This is my story...'],
            full:false,
            user:'N/A'
        })
        await story.save()
        const lastSentence=story.sentences.pop()
        return {sentence:lastSentence,storyId:story.storyId}
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