'use strict';
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var gql = require('apollo-server-hapi').gql;
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\ntype Query{\nstoryToAdd():[Story]\nstoryFull():Story\n     }\n    type Mutation{\n    storyUpdate(type:storyInput):Boolean\n    }\n    type Story{\n   story:String,\n   edit:Number\n    },\n    input storyInput{\n    story:String,\n    add:String\n    }\n    "], ["\ntype Query{\nstoryToAdd():[Story]\nstoryFull():Story\n     }\n    type Mutation{\n    storyUpdate(type:storyInput):Boolean\n    }\n    type Story{\n   story:String,\n   edit:Number\n    },\n    input storyInput{\n    story:String,\n    add:String\n    }\n    "])));
exports["default"] = typeDefs;
var templateObject_1;
