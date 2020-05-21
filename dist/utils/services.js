"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../data/mongo/story_schema');
const storyFullSchema = require('../data/mongo/story_full_schema');
async function storyGetorCreate(edit) {
    switch (true) {
        case (edit == 0):
            return 'This is my story...';
            break;
        case (edit == 1):
            const storypart1 = await storySchema.findOne({ storyPart1: { $exists: true } }).exec();
            console.log(storypart1);
            if (storypart1 == null) {
                return '';
            }
            else {
                return storypart1.storyPart1.pop();
            }
            break;
        case (edit == 2):
            const storypart2 = await storySchema.findOne({ storyPart2: { $exists: false }, storyPart1: { $exists: true } }).exec();
            console.log(storypart2);
            if (storypart2 == null) {
                return '';
            }
            else {
                return storypart2.storyPart2.pop();
            }
            break;
    }
}
exports.storyGetorCreate = storyGetorCreate;
function storyAddSentences(sentences) {
    let story = '';
    while (sentences != []) {
        story = sentences.pop() + story;
    }
    return story;
}
async function storyGetFull(call) {
    let storyParts = await storySchema.findOneAndDelete({ storyPart0: { $exists: true }, storyPart1: { $exists: true }, storyPart2: { $exists: true } }).exec();
    if (storyParts != null) {
        let story;
        story = await storyAddSentences(storyParts.storyPart0);
        story = story + await storyAddSentences(storyParts.storyPart1);
        story = story + await storyAddSentences(storyParts.storyPart2);
        const storyFull = new storyFullSchema({
            story: story
        });
        await storyFull.save();
        return story;
    }
    else {
        const story = await storyFullSchema.findOne({ id: call }).exec();
        console.log(story);
        if (story == null) {
            return 'sorry we currently don\'t have anymore stories';
        }
        else {
            story.story;
        }
    }
}
exports.storyGetFull = storyGetFull;
function storyCutInSentences(story) {
    let sentences = [];
    console.log(story);
    if (story.length <= 50) {
        const before = sentences.push(story);
        console.log(before);
        console.log(sentences);
        return sentences;
    }
    else {
        while (story.length > 50) {
            if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
                sentences.push((story.substring(story.lastIndexOf('.'))));
            }
            else {
                sentences.push(story.substring(story.length - 50, story.length));
            }
        }
    }
    console.log(sentences);
    return sentences;
}
async function storyEditAdd(story, add, edit) {
    const sentences = storyCutInSentences(add);
    console.log(sentences);
    //Me fijo si en alguna historia le falta la parte que voy agregar y lo agrego, sino creo uno nuevo
    if (story == '') {
        switch (true) {
            case (edit == 0):
                const update_1_with_0 = await storySchema.findOne({ storyPart1: { $exists: true } }).exec();
                const update_2_with_0 = await storySchema.findOne({ storyPart2: { $exists: true } }).exec();
                switch (true) {
                    case (update_1_with_0 != null):
                        await update_1_with_0.add({ storyPart0: sentences });
                        break;
                    case (update_2_with_0 != null):
                        await update_2_with_0.add({ storyPart0: sentences });
                        break;
                    default:
                        const new_story = new storySchema({
                            storyPart0: sentences
                        });
                        await new_story.save();
                        break;
                }
            case (edit == 1):
                const update_0_with_1 = await storySchema.findOne({ storyPart0: { $exists: true }, storyPart1: { $exists: false } }).exec();
                const update_2_with_1 = await storySchema.findOne({ storyPart2: { $exists: true }, storyPart1: { $exists: false } }).exec();
                switch (true) {
                    case (update_0_with_1 != null):
                        await update_0_with_1.add({ storyPart1: sentences });
                        break;
                    case (update_2_with_1 != null):
                        await update_2_with_1.add({ storyPart1: sentences });
                        break;
                    default:
                        const new_story = new storySchema({
                            storyPart1: sentences
                        });
                        await new_story.save();
                        break;
                }
            case (edit == 2):
                const update_0_with_2 = await storySchema.findOne({ storyPart0: { $exists: true }, storyPart2: { $exists: false } }).exec();
                const update_1_with_2 = await storySchema.findOne({ storyPart1: { $exists: true }, storyPart2: { $exists: false } }).exec();
                switch (true) {
                    case (update_0_with_2 != null):
                        await update_0_with_2.add({ storyPart2: sentences });
                        break;
                    case (update_1_with_2 != null):
                        await update_1_with_2.add({ storyPart2: sentences });
                        break;
                    default:
                        const new_story = new storySchema({
                            storyPart2: sentences
                        });
                        await new_story.save();
                        break;
                }
        }
    }
    else {
        if (edit == 1) {
            const storypart0 = await storySchema.findOne({ storyPart0: story }).exec();
            await storypart0.add({ storyPart1: sentences });
        }
        else {
            const storypart1 = await storySchema.findOne({ storyPart1: story }).exec();
            await storypart1.add({ storyPart2: sentences });
        }
    }
}
exports.storyEditAdd = storyEditAdd;
