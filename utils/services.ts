import Story from "../data/classes/story";
const storySchema=require('../data/mongo/storySchema')
async function update(sentence: string, storyId:string,user:string) {
const story=await storySchema.findOneAndUpdate({id:storyId}).exec()
    story.sentences.push(sentence)
    story.length=story.length+1
    story.user=user
    if(story.length>=story.storyMinLength) {
        story.full = true
    }
    await story.save()
    return true
}
async function getLastSentence(user:string) {
    let story=new Story()
   story=await story.getStory(user,story)
    console.log(story)
    if(story) {
        const lastSentence=story.getSentenceToWrite(story)
        return lastSentence
    }
    else{//Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: [],
            storyMinLength:5,
            length:0,
            full:false,
            user:'N/A'
        })
        await story.save()
        return {sentence:story.lastSentence,user:story.storyId}
    }
}
export {
    update,
    getLastSentence
}