"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const query = {
    Query: {
        storyToAdd: async (_, { edit }) => {
            const story = await services_1.storyGetorCreate(edit, false);
            return story;
        },
        storyFull: async (_) => {
            const story = await services_1.storyGetorCreate(2, true);
            return story;
        }
    }
};
exports.default = query;
