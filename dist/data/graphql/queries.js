"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storyFull_1 = require("../classes/storyFull");
const services_1 = require("../../utils/services");
const query = {
    Query: {
        storyToAdd: async (_, { userId }) => {
            const lastSentence = await services_1.getLastSentence(userId);
            return lastSentence;
        },
        storyFull: async (_, { call }) => {
            const storyFull = new storyFull_1.default();
            const story = await services_1.getStoryFull(call);
            return story;
        }
    }
};
exports.default = query;
