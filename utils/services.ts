
const storySchema=require('../data/mongo/story_schema');
const storyFullSchema=require('../data/mongo/story_full_schema')
async function  storyGetorCreate(edit:number) {
    switch(true)
    {
        case (edit==0):
                return "This is my story..."
            break
        case (edit==1):
            const storyPart1= await storySchema.findOne({storyPart0:{$exists:true}}).exec()
            if (storyPart1==null) {
                return "..."
            }
            else{
                const sentence=storyCutLastSentence(storyPart1.storyPart0)
                return sentence
            }
            break
        case (edit==2):
            const storyPart2= await storySchema.findOne({storyPart2:{$exists:false},storyPart1:{$exists:true}}).exec()
            if (storyPart2==null) {
                return '...'
            }
            else{
                const sentence=await storyCutLastSentence(storyPart2.storyPart1)
                return sentence
            }
            break
    }
}
async function storyGetFull(call:number){
     let storyParts=await storySchema.findOneAndDelete({storyPart0:{$exists:true},storyPart1:{$exists:true},storyPart2:{$exists:true}}).exec()
    if(storyParts!=null)
    {
        const story=storyParts.storyPart0+storyParts.storyPart1+storyParts.storyPart2
        const storyFull = new storyFullSchema({
            story: story
        })
        await storyFull.save()
        return story
    }
    else {
        const story = await storyFullSchema.findOne({id: call}).exec()
        if(story == null) {
          return  "sorry we currently don\'t have anymore stories"
        }
    else{
        story.story
        }
    }
}
function storyCutLastSentence(story:string){
    let sentences
  if(story.length<=50){
      return story
  }
  else {
          if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
            sentences=story.substring(story.lastIndexOf('.'))
              return sentences
          } else {
              sentences=story.substring(story.length - 50, story.length)
              return sentences
          }
      }
}
async function storyAddOrCreate(add:string,edit:number) {
    switch (true) {
        case (edit == 0):
            const update1With0 = await storySchema.findOne({
                storyPart1: {$exists: true},
                storyPart0: {$exists: false}
            }).exec()
            const update2With0 = await storySchema.findOne({
                storyPart2: {$exists: true},
                storyPart0: {$exists: false}
            }).exec()
            switch (true) {
                case(update1With0 != null):
                    await update1With0.add({storyPart0: add})
                    break
                case (update2With0 != null):
                    await update2With0.add({storyPart0: add})
                    break
                default:
                    const new_story = new storySchema({
                        storyPart0: add
                    })
                    await new_story.save()
                    break
            }
            break
        case (edit == 1):
            const update2With1 = await storySchema.findOne({
                storyPart2: {$exists: true},
                storyPart1: {$exists: false}
            }).exec()
                if (update2With1 != null) {
                    await update2With1.add({storyPart1: add})
                }
                else{
                    const newStory = new storySchema({
                        storyPart1: add
                    })
                    await newStory.save()
            }
            break
        case(edit == 2):
            const update0With2 = await storySchema.findOne({
                storyPart0: {$exists: true},
                storyPart2: {$exists: false}
            }).exec()
                if(update0With2 != null)
                {
                    await update0With2.add({storyPart2: add})
                }
                else{
                    const newStory = new storySchema({
                        storyPart2: add
                    })
                    await newStory.save()
            }
            break
    }
}

async function storyEditAdd(story:string,add:string,edit:number) {
    if(add!="") {//No puede pasar que se agregue nada a la historia
        //Me fijo si en alguna historia le falta la parte que voy agregar y lo agrego, sino creo uno nuevo
        if (story == "..." || story == "This is my story...") {
            await storyAddOrCreate(add, edit)
            //Ya que antes no tenia una historia para agregar directamente busco donde lo puedo agregar y sino creo uno nuevo
        } else {
            if (edit == 1) {
                const storyPart0 = await storySchema.findOne({storyPart0: story}).exec()
                await storyPart0.add({storyPart1: add})
            } else {
                const storyPart1 = await storySchema.findOne({storyPart1: story}).exec()
                await storyPart1.add({storyPart2: add})
            }
        }
    }
}
export {
    storyEditAdd,
    storyGetorCreate,
    storyGetFull
}