"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
const resolvers = {
    ...queries_1.default,
    ...mutations_1.default
};
exports.default = resolvers;
