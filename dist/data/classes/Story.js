"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentence_1 = require("./Sentence");
class Story {
    constructor(sentences, storyId) {
        if (sentences.length < 15) {
            console.log(sentences);
            this.sentencesAmount = sentences.length;
            const lastSentence = new Sentence_1.default(sentences.pop());
            const story = [lastSentence];
            sentences.map((sentences) => {
                const sentence = new Sentence_1.default(sentences);
                story.push(sentence);
            });
            this.story = story;
            this.storyId = storyId;
        }
    }
    getSentenceToContinue(story) {
        const lastSentence = story.story.pop();
        lastSentence.cutLastSentence(lastSentence);
        const storyToContinue = {
            last_sentence: lastSentence,
            storyId: story.storyId
        };
        this.sentencesAmount = this.sentencesAmount - 1;
        return storyToContinue;
    }
}
exports.default = Story;
