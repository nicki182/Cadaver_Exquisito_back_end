"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const sentence_1 = require("./sentence");
class Story {
    constructor(sentences, storyId) {
        if (sentences.length < 15) {
            this.sentencesAmount = sentences.length;
            const lastSentence = new sentence_1.default(sentences.pop());
            let sentencesList = [lastSentence];
            sentences.map((sentences) => {
                const sentence = new sentence_1.default(sentences);
                sentencesList.push(sentence);
            });
            this.story = sentencesList;
            this.storyId = storyId;
        }
    }
    getSentenceToContinue(story) {
        const lastSentence = story.story.pop();
        lastSentence.cutLastSentence(lastSentence);
        const storyId = story.storyId;
        this.sentencesAmount--;
        return { sentence: lastSentence.text, storyId: storyId };
    }
}
exports.default = Story;
