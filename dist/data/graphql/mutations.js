"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const mutations = {
    Mutation: {
        storyUpdate: async (_, { type }) => {
            const story = await services_1.storyGetorCreate(type.edit);
            if (type.edit != 0) {
                await services_1.storyEditAdd(type.story, type.add);
            }
            return story;
        }
    }
};
exports.default = mutations;
