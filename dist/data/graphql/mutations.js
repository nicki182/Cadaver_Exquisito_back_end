"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const mutations = {
    Mutation: {
        storyUpdate: async (_, { type }) => {
            try {
                await services_1.storyEditAdd(type.story, type.add);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
exports.default = mutations;
