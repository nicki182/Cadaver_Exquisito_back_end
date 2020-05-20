
const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
async function  storyGetorCreate(edit:number) {
        const story = await storySchema.findOne({edit: edit}).exec()
        switch (true) {
            case (edit == 0 && story==null):
                const new_story =new storySchema({
                    story: 'This is my story...',
                    edit:[3]
                })
                await new_story.updateOne(new_story,{upsert:true})
                return new_story.story
            break;
            case(edit<=2 && story==null):
                const story_to_continue =new storySchema({
                    story: '',
                    edit: [edit],
                })
                return story_to_continue.story
            break;
            default:
                return story.story.pop()
            break
        }
}
async function storyGetFull(call:number){
    const story=await storyFullSchema.findOne({id:call}).exec()
    story==null?'sorry we currently don\'t have a full story':story.story
}
function storyCut(story:string){
  if(story.length<=50){
      return story
  }
  let sentences=[]
  while(story.length>50){
      if(/['.']/.test(story)){
          sentences.push((story.substring(story.lastIndexOf('.'))))
      }
      else{
          sentences.push(story.substring(story.length-50,story.length))
      }
  }
  return sentences
}
async function storyEditAdd(add:string,story:string){
    const sentences=storyCut(add)
        // @ts-ignore
    const update_story=await storySchema.findOneAndUpdateMany({story: story}, {$push:{story:sentences},$push:{$dec:{edit:1}}},{new:true})
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