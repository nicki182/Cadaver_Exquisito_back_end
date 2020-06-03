"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const sentence_1 = require("./sentence");
class Story {
    constructor(sentences, storyId) {
        const text = sentences.pop();
        this.lastSentence = new sentence_1.default(text);
        this.storyId = storyId;
    }
    getSentenceToWrite(story) {
        const lastSentence = story.lastSentence.cutLastSentence(story.lastSentence);
        console.log(story.storyId);
        return { sentence: lastSentence, user: story.storyId };
    }
}
exports.default = Story;
