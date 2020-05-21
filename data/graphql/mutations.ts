import {IResolvers} from "graphql-tools";
import {storyEditAdd,storyGetorCreate} from "../../utils/services";

const mutations:IResolvers=
    {
        Mutation: {
            storyUpdate: async (_, {type}) => {
                try {
                    await storyEditAdd(type.story, type.add, type.edit)
                    return true
                }
                catch (e) {
                    return false
                }
            }
        }
    }
export default mutations;