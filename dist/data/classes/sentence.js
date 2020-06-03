"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
class sentence {
    constructor(text) {
        this.text = text;
    }
    cutLastSentence(story) {
        let sentences;
        if (story.length <= 50) {
            return story;
        }
        else {
            if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
                sentences = story.substring(story.lastIndexOf('.'));
                return sentences;
            }
            else {
                sentences = story.substring(story.length - 50, story.length);
                return sentences;
            }
        }
    }
}
exports.default = sentence;
