const storySchema=require('../data/mongo/storySchema')
async function create(sentence:string,user:string,maxLength:number) {
        const story = new storySchema({
            sentences: [{sentence: sentence, user: user}],
            storyLength: maxLength
        })
       await story.create()
        return true
}

async function update(sentence: string, user:string) {
await storySchema.findOneAndUpdate({$push:{sentences:{user,sentence}}})
    return true
}
export {
    update,
    create
}