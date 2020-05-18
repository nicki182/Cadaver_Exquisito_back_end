import { IResolvers } from "graphql-tools";
import query from "./queries";
import mutations from "./mutations";

const resolvers : IResolvers = {
    ...query,
    ...mutations
}

export default resolvers;