import {IResolvers} from "graphql-tools";
import {update} from '../../utils/services';

const mutations:IResolvers= {
    Mutation: {
        storyUpdate: async (_, {type}) => {
            try {
                await update(type.sentence, type.storyId, type.user,type.storyMaxLength)
                return true
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }
}
export default mutations;