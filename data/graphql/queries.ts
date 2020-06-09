import {IResolvers} from "graphql-tools";
import StoryFull from "../classes/storyFull";
import Story from "../classes/story";
import {getLastSentence,getStoryFull} from '../../utils/services'
const query:IResolvers=
    {
        Query: {
            storyToAdd: async (_,{userId}) => {
                const lastSentence = await getLastSentence(userId)
                return lastSentence
            },
            storyFull:async (_,{call})=>{
                const storyFull =new StoryFull()
                const story=await getStoryFull(call)
                return story
            }
        }
    }
export default query;