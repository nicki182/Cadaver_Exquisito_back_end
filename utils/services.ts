
const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
async function  storyGetorCreate(edit:number) {
        const story = await storySchema.findOne({edit: edit}).exec()
        switch (true) {
            case (edit == 0 && story==null):
                const new_story =new storySchema({
                    story: 'This is my story...',
                    edit: [0]
                })
                await new_story.updateOne(new_story,{upsert:true})
                return new_story.story
            break;
            case(edit<=2 && story==null):
                const story_to_continue =new storySchema({
                    story: '',
                    edit: [edit],
                })
                await story_to_continue.updateOne(story_to_continue,{upsert:true})
                return story_to_continue.story
            break;
            default:
                return story.story
            break
        }
}
async function storyGetFull(){
    const story=await storyFullSchema.findOne().exec()
    story==null?'sorry we currently dont have a full story':story.story
}
function storyCut(story:string){
  if(story.length<=50){
      return story
  }
  if(story.length>50){
      if(/['.']/.test(story)){
          return story.substring(story.lastIndexOf('.'))
      }
      else{
          return story.substring(story.length-50,story.length)
      }
  }
}
async function storyEditAdd(add:string,story:string){
        const update_story=await storySchema.findOneAndUpdate({story: story}, {story: story + add,$push:{$inc:{edit:1}}},{upsert:true,new:true})
    if(update_story.edit.sort().toString()==[1,2,3].toString()){
        await storySchema.deleteOne({story: story})
        await storyFullSchema.updateOne(update_story,{upsert:true,new:true})
    }
}
export {
    storyCut,
    storyEditAdd,
    storyGetorCreate,
    storyGetFull
}