import {IResolvers} from "graphql-tools";
import {storyEditAdd,storyGetorCreate} from "../../utils/services";

const mutations:IResolvers=
    {
        Mutation: {
            storyUpsert: async (_, {type}) => {
                const story = await storyGetorCreate(type.edit)
                if(type.edit!=0) {await storyEditAdd(type.story, type.add)}
                return story
            }
        }
    }
export default mutations;