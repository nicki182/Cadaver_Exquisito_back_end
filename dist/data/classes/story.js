"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const sentence_1 = require("./sentence");
class Story {
    async getStory(user, story) {
        const storyS = await storySchema.findOne({ expr: { $ne: { user: user } }, full: false }).exec();
        const text = storyS.sentences.pop();
        const sentence = new sentence_1.default(text);
        story.lastSentence = sentence;
        story.storyId = storyS.id;
        return story;
    }
    getSentenceToWrite(story) {
        console.log(story);
        const lastSentence = story.lastSentence.cutLastSentence(story.lastSentence);
        const storyId = story.storyId;
        return { sentence: lastSentence, storyId: storyId };
    }
}
exports.default = Story;
