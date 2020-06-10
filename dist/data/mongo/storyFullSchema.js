"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const StoryFull_schema = mongoose.Schema;
const StoryFullschema = new StoryFull_schema({
    story: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('story_full', StoryFullschema);
exports.default = StoryFullschema.methods;
