import {IResolvers} from "graphql-tools";
import {storyGetorCreate} from "../../utils/services";

const query:IResolvers=
    {
        Query:{
            storyFull:async (_)=>{
                const story=await storyGetorCreate(3)
                return story
            }
        }
    }
export default query;