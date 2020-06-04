"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const story_1 = require("../data/classes/story");
const storySchema = require('../data/mongo/storySchema');
async function update(sentence, storyId, user) {
    const story = await storySchema.findOneAndUpdate({ id: storyId }).exec();
    story.sentences.push(sentence);
    story.length = story.length + 1;
    story.user = user;
    if (story.length >= story.storyMinLength) {
        story.full = true;
    }
    await story.save();
    return true;
}
exports.update = update;
async function getLastSentence(user) {
    let story = new story_1.default();
    story = await story.getStory(user, story);
    console.log(story);
    if (story) {
        const lastSentence = story.getSentenceToWrite(story);
        return lastSentence;
    }
    else { //Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: [],
            storyMinLength: 5,
            length: 0,
            full: false,
            user: 'N/A'
        });
        await story.save();
        return { sentence: story.lastSentence, user: story.storyId };
    }
}
exports.getLastSentence = getLastSentence;
