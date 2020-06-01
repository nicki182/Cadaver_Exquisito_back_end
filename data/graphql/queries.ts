import {IResolvers} from "graphql-tools";
import StoryFull from "../classes/storyFull";
import Story from "../classes/story";
const query:IResolvers=
    {
        Query: {
            storyToAdd: async (_,{lastPart,idUser}) => {
               const story =new Story()
                const lastSentence = await story.getLastSentence(lastPart,idUser)
                return lastSentence
            },
            storyFull:async (_,{call})=>{
                const storyFull =new StoryFull()
                const story=await storyFull.getStoryFull(call)
                return story
            }
        }
    }
export default query;