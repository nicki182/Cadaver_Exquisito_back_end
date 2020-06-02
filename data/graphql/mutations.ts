import {IResolvers} from "graphql-tools";
import {create,update} from '../../utils/services';

const mutations:IResolvers= {
        Mutation: {
            storyUpdate: async (_, {type}) => {
                try {
                   await update(type.text, type.lastUser,type.newUser)
                    return true
                }
                catch (e) {
                    return false
                }
            },
            storyCreate:async (_, {type})=>{
                try {
                    await create(type.sentence, type.user,type.maxLength)
                    return true
                }
                catch (e) {
                    return false
                }
            }
        }
    }
export default mutations;