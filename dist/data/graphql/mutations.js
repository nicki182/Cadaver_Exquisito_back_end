"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const mutations = {
    Mutation: {
        storyUpdate: async (_, { type }) => {
            try {
                await services_1.update(type.sentence, type.storyId, type.user);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};
exports.default = mutations;
