import Story from "../data/classes/story";
const storySchema=require('../data/mongo/storySchema')
async function update(sentence: string, storyId:string,user:string) {
const story=await storySchema.findOneAndUpdate({id:storyId}).exec()
    story.sentences.push(sentence)
    story.length=story.length+1
    story.user=user
    if(story.length>=story.storyLength) {
        story.full = true
        await story.save()
        return true
    }
    await story.save()
    return true
}
async function getLastSentence(user:string) {
    const story = await storySchema.findOne({expr: {$ne: {user: user}}, full: false}).exec()
    const storyToWrite=new Story(story.sentences,story.id)
    console.log(storyToWrite)
    if(story) {
        const lastSentence=storyToWrite.getSentenceToWrite(storyToWrite)
        return lastSentence
    }
    else{//Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: [],
            storyLength:5,
            length:0,
            full:false,
            user:'N/A'
        })
        await story.save()
        const storyToWrite=new Story(story.sentences,story.id)
        return {sentence:storyToWrite.lastSentence,user:storyToWrite.storyId}
    }
}
export {
    update,
    getLastSentence
}