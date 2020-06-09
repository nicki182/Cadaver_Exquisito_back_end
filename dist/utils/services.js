"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const story_1 = require("../data/classes/story");
const storyFull_1 = require("../data/classes/storyFull");
const storySchema = require('../data/mongo/storySchema');
const storyFullSchema = require('../data/mongo/storyFullSchema');
async function update(sentence, storyId, user, storyMaxLength) {
    const story = await storySchema.findOneAndUpdate({ id: storyId }).exec();
    story.sentences.push(sentence);
    story.user = user;
    if (story.storyMaxLength == null) {
        await storySchema.add({ storyMaxLength: storyMaxLength });
    }
    else if (story.sentences.length > story.storyMaxLength) {
        story.full = true;
    }
    await story.save();
    return true;
}
exports.update = update;
async function getLastSentence(user) {
    console.log(user);
    const storyQuery = await storySchema.findOne({ user: { $ne: user } }, { full: false }).exec();
    console.log(storyQuery.user);
    if (storyQuery) {
        const story = new story_1.default(storyQuery.sentences, storyQuery.user);
        const lastSentence = story.getSentenceToWrite(story);
        return lastSentence;
    }
    else { //Aca se podria agragar oraciones para enviar que sean elegidos de forma randomizada
        const story = new storySchema({
            sentences: ['This is my story...'],
            full: false,
            user: 'N/A'
        });
        await story.save();
        return { sentence: story.pop(), user: story.storyId };
    }
}
exports.getLastSentence = getLastSentence;
async function getStoryFull(call) {
    const storyInSentences = storySchema.findOneAndRemove({ full: true });
    if (storyInSentences != null) {
        const storyFull = new storyFull_1.default(storyInSentences.sentences);
        return storyFull;
    }
    else {
        const storyFull = storyFullSchema.findOne({ id: call });
        return storyFull.story == null ? 'Sorry there are no more stories' : storyFull.story;
    }
}
exports.getStoryFull = getStoryFull;
