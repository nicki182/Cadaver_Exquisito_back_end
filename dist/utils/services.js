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
            const storypart1 = await storySchema.findOne({ storyPart0: { $exists: true } }).exec();
            if (storypart1 == null) {
                return '';
            }
            else {
                const sentence = storyCutLastSentence(storypart1.storyPart0);
                return sentence;
            }
            break;
        case (edit == 2):
            const storypart2 = await storySchema.findOne({ storyPart2: { $exists: false }, storyPart1: { $exists: true } }).exec();
            if (storypart2 == null) {
                return '';
            }
            else {
                const sentence = await storyCutLastSentence(storypart2.storyPart1);
                return sentence;
            }
            break;
    }
}
exports.storyGetorCreate = storyGetorCreate;
async function storyGetFull(call) {
    let storyParts = await storySchema.findOneAndDelete({ storyPart0: { $exists: true }, storyPart1: { $exists: true }, storyPart2: { $exists: true } }).exec();
    if (storyParts != null) {
        const story = storyParts.storyPart0 + storyParts.storyPart1 + storyParts.storyPart2;
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
function storyCutLastSentence(story) {
    let sentences;
    console.log(story);
    if (story.length <= 50) {
        return story;
    }
    else {
        if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
            sentences = story.substring(story.lastIndexOf('.'));
            return sentences;
        }
        else {
            sentences = story.substring(story.length - 50, story.length);
            return sentences;
        }
    }
}
async function storyAddOrCreate(add, edit) {
    switch (true) {
        case (edit == 0):
            const update_1_with_0 = await storySchema.findOne({
                storyPart1: { $exists: true },
                storyPart0: { $exists: false }
            }).exec();
            const update_2_with_0 = await storySchema.findOne({
                storyPart2: { $exists: true },
                storyPart0: { $exists: false }
            }).exec();
            switch (true) {
                case (update_1_with_0 != null):
                    await update_1_with_0.add({ storyPart0: add });
                    break;
                case (update_2_with_0 != null):
                    await update_2_with_0.add({ storyPart0: add });
                    break;
                default:
                    const new_story = new storySchema({
                        storyPart0: add
                    });
                    await new_story.save();
                    break;
            }
            break;
        case (edit == 1):
            const update_0_with_1 = await storySchema.findOne({
                storyPart0: { $exists: true },
                storyPart1: { $exists: false }
            }).exec(); //Esta busqueda estoy dudando si es necesaria ya que cuando busco,me fijo si esta la parte 0
            const update_2_with_1 = await storySchema.findOne({
                storyPart2: { $exists: true },
                storyPart1: { $exists: false }
            }).exec();
            switch (true) {
                case (update_0_with_1 != null):
                    await update_0_with_1.add({ storyPart1: add });
                    break;
                case (update_2_with_1 != null):
                    await update_2_with_1.add({ storyPart1: add });
                    break;
                default:
                    const new_story = new storySchema({
                        storyPart1: add
                    });
                    await new_story.save();
                    break;
            }
            break;
        case (edit == 2):
            const update_0_with_2 = await storySchema.findOne({
                storyPart0: { $exists: true },
                storyPart2: { $exists: false }
            }).exec(); //Esta busqueda estoy dudando si es necesaria ya que cuando busco,me fijo si esta la parte 1
            const update_1_with_2 = await storySchema.findOne({
                storyPart1: { $exists: true },
                storyPart2: { $exists: false }
            }).exec();
            switch (true) {
                case (update_0_with_2 != null):
                    await update_0_with_2.add({ storyPart2: add });
                    break;
                case (update_1_with_2 != null):
                    await update_1_with_2.add({ storyPart2: add });
                    break;
                default:
                    const new_story = new storySchema({
                        storyPart2: add
                    });
                    await new_story.save();
                    break;
            }
            break;
    }
}
async function storyEditAdd(story, add, edit) {
    //Me fijo si en alguna historia le falta la parte que voy agregar y lo agrego, sino creo uno nuevo
    if (story == '' || story == 'This is my story...') {
        await storyAddOrCreate(add, edit);
        //Agrego a la historia que siguio le usuario
    }
    else {
        if (edit == 1) {
            const storypart0 = await storySchema.findOne({ storyPart0: story }).exec();
            await storypart0.add({ storyPart1: add });
        }
        else {
            const storypart1 = await storySchema.findOne({ storyPart1: story }).exec();
            await storypart1.add({ storyPart2: add });
        }
    }
}
exports.storyEditAdd = storyEditAdd;
