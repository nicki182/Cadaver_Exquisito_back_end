"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storyFull_1 = require("../classes/storyFull");
const story_1 = require("../classes/story");
const query = {
    Query: {
        storyToAdd: async (_, { edit }) => {
            const get = new story_1.default();
            const got = await get.getLastSentence(edit);
            return got;
        },
        storyFull: async (_, { call }) => {
            const get = new storyFull_1.default();
            const story = await get.get(call);
            return story;
        }
    }
};
exports.default = query;
