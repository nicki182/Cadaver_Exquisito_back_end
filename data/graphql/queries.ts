import {IResolvers} from "graphql-tools";
import {storyGetorCreate} from "../../utils/services";

const query:IResolvers=
    {
        Query: {
            storyToAdd: async (_,{edit}) => {
                const story = await storyGetorCreate(edit,false)
                return story
            },
            storyFull:async (_)=>{
                const story=await storyGetorCreate(2,true)
                return story
            }
        }
    }
export default query;