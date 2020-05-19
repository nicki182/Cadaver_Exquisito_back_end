"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Story_schema = mongoose.Schema;
const Storyschema = new Story_schema({
    story: {
        type: String,
        required: true,
    },
    edit: {
        type: [Number],
        required: true
    }
});
module.exports = mongoose.model('story', Storyschema);
exports.default = Storyschema.methods;
