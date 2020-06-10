"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StoryFull {
    constructor(storyInSentences, story) {
        if (storyInSentences) {
            const story = '';
            storyInSentences.map(sentence => story + sentence);
            this.story = story;
        }
        else {
            this.story = story;
        }
    }
}
exports.default = StoryFull;
