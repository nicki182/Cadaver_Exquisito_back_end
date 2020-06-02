import Story from "./story";
const storySchema=require('../mongo/storySchema')
const storyFullSchema=require('../mongo/storyFullSchema')
class StoryFull{
story:string
    getStoryFull(call:number){
    const storyInSentences=storySchema.findOne({full:true})
        if(storyInSentences!=null){
            this.storyInSentencesToStoryFull(storyInSentences.sentences)
            return this.story
        }
        else{
            const storyFull=storyFullSchema.findOne({id:call})
            return storyFull==null?'Sorry there are no more stories':storyFull.story
        }
    }
    storyInSentencesToStoryFull(storyInSentences:[{user:string,text:string}]){
    let story=''
    while(storyInSentences!=[]){
        story=storyInSentences.pop().text+story
    }
    this.story=story
}
}
export default StoryFull