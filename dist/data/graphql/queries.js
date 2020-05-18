"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const query = {
    Query: {
        storyFull: async (_) => {
            const story = await services_1.storyGetorCreate(3);
            return story;
        }
    }
};
exports.default = query;
