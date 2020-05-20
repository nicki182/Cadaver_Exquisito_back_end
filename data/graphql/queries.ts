import {IResolvers} from "graphql-tools";
import {storyGetorCreate,storyGetFull} from "../../utils/services";

const query:IResolvers=
    {
        Query: {
            storyToAdd: async (_,{edit}) => {
                const story = await storyGetorCreate(edit)
                return story
            },
            storyFull:async (_,{call})=>{
                const story=await storyGetFull(call)
                return story
            }
        }
    }
export default query;