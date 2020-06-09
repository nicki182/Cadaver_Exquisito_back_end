"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const storyFullSchema = require('../mongo/storyFullSchema');
class StoryFull {
    constructor(storyInSentences, story) {
        if (storyInSentences) {
            let story = '';
            storyInSentences.map(sentence => story + sentence);
            this.story = story;
        }
        else {
            this.story = story;
        }
    }
}
exports.default = StoryFull;
