"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const story_1 = require("../classes/story");
const mutations = {
    Mutation: {
        storyUpdate: async (_, { type }) => {
            try {
                const update = new story_1.default();
                update.upsert(type.story, type.add, type.edit);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
exports.default = mutations;
