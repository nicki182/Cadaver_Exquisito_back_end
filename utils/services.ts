const storySchema=require('../data/mongo/storySchema')
async function create(sentence:string,user:string,maxLength:number) {
        const story = new storySchema({
            sentences: [{sentence: sentence, user: user}],
            storyLength: maxLength,
            full:false
        })
       await story.create()
        return true
}

async function update(sentence: string, lastUser:string,newUser:string) {
await storySchema.findOneAndUpdate({sentences:{user:lastUser}},{$set:{$push:{sentences:{newUser,sentence}}}})
    return true
}
export {
    update,
    create
}