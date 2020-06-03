"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sentence_1 = require("../data/classes/sentence");
const storySchema = require('../data/mongo/storySchema');
async function update(sentence, storyId, user) {
    console.log(storyId);
    const story = await storySchema.findOneAndUpdate({ id: storyId }).exec();
    story.sentences.push(sentence);
    story.length = story.length + 1;
    story.user = user;
    if (story.length == story.maxLength) {
        story.full = true;
        await story.save();
        return true;
    }
    await story.save();
    return true;
}
exports.update = update;
async function getLastSentence(user) {
    const story = await storySchema.findOne({ expr: { $ne: { user: user } }, full: false }).where('maxLength').equals('length').exec();
    if (story) {
        const senteces = new sentence_1.default(story.sentences.pop().text);
        const lastSentence = senteces.cutLastSentence(senteces.text);
        const toWrite = { sentence: lastSentence, storyId: story.id };
        return toWrite;
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
        const toWrite = { sentence: '', storyId: story.id };
        return toWrite;
    }
}
exports.getLastSentence = getLastSentence;
