"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const story_1 = require("../data/classes/story");
const storySchema = require('../data/mongo/storySchema');
async function update(sentence, storyId, user) {
    const story = await storySchema.findOneAndUpdate({ id: storyId }).exec();
    story.sentences.push(sentence);
    story.length = story.length + 1;
    story.user = user;
    if (story.length >= story.storyLength) {
        story.full = true;
        await story.save();
        return true;
    }
    await story.save();
    return true;
}
exports.update = update;
async function getLastSentence(user) {
    const story = await storySchema.findOne({ expr: { $ne: { user: user } }, full: false }).exec();
    const storyToWrite = new story_1.default(story.sentences, story.id);
    console.log(storyToWrite);
    if (story) {
        const lastSentence = storyToWrite.getSentenceToWrite(storyToWrite);
        return lastSentence;
    }
    else { //Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: [],
            storyLength: 5,
            length: 0,
            full: false,
            user: 'N/A'
        });
        await story.save();
        const storyToWrite = new story_1.default(story.sentences, story.id);
        return storyToWrite;
    }
}
exports.getLastSentence = getLastSentence;
