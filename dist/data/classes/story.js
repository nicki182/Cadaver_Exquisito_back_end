"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const sentence_1 = require("./sentence");
class Story {
    constructor(sentences, storyId) {
        if (sentences.length < 15) {
            this.sentencesCount = sentences.length;
            const lastSentence = new sentence_1.default(sentences.pop());
            let sen = [lastSentence];
            sentences.map((sentences) => {
                const sentence = new sentence_1.default(sentences);
                sen.push(sentence);
            });
            this.story = sen;
            this.storyId = storyId;
        }
    }
    getSentenceToWrite(story) {
        const lastSentence = story.story.pop();
        lastSentence.cutLastSentence(lastSentence);
        const storyId = story.storyId;
        return { sentence: lastSentence.text, storyId: storyId };
    }
}
exports.default = Story;
