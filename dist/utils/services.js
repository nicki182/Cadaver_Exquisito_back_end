"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Story_1 = require("../data/classes/Story");
const StoryFull_1 = require("../data/classes/StoryFull");
const storyFullSchema = require('../data/mongo/storyFullSchema');
const storySchema = require('../data/mongo/storySchema');
async function update(sentence, storyId, user, storyMaxLength) {
    const story = await storySchema.findOneAndUpdate({ id: storyId }).exec();
    story.sentences.push(sentence);
    story.user = user;
    if (story.storyMaxLength) {
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
    const storyQuery = await storySchema.findOne({ user: { $ne: user } }, { full: false }).exec();
    console.log(storyQuery);
    if (storyQuery) {
        const story = new Story_1.default(storyQuery.sentences, storyQuery.user);
        const lastSentence = story.getSentenceToContinue(story);
        return lastSentence;
    }
    else {
        const story = new storySchema({
            sentences: ['This is my story...'],
            full: false,
            user: 'N/A'
        });
        await story.save();
        const lastSentence = story.sentences.pop();
        return { sentence: lastSentence, storyId: story.storyId };
    }
}
exports.getLastSentence = getLastSentence;
async function getStoryFull(call) {
    const storyInSentences = storySchema.findOneAndRemove({ full: true });
    if (storyInSentences != null) {
        const storyFull = new StoryFull_1.default(storyInSentences.sentences);
        return storyFull;
    }
    else {
        const storyFull = storyFullSchema.findOne({ id: call });
        return storyFull.story == null ? 'Sorry there are no more stories' : storyFull.story;
    }
}
exports.getStoryFull = getStoryFull;
