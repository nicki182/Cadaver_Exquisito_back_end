"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const query = {
    Query: {
        storyToAdd: async (_, { edit }) => {
            const story = await services_1.storyGetorCreate(edit);
            return story;
        },
        storyFull: async (_, { call }) => {
            const story = await services_1.storyGetFull(call);
            return story;
        }
    }
};
exports.default = query;
