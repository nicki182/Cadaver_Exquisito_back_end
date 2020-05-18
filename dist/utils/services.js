"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../data/mongo/story_schema');
async function storyGetorCreate(edit) {
    const story = await storySchema.findOne({ edit: edit }).exec();
    console.log(edit);
    console.log(story);
    switch (story) {
        case (edit == 0 && story == null):
            const new_story = new storySchema({
                story: 'This is my story...',
                edit: 0
            });
            await new_story.updateOne(new_story, { upsert: true, new: true });
            return new_story.story;
            break;
        case (edit < 3 && story == null):
            const story_to_continue = new storySchema({
                story: '',
                edit: edit,
            });
            await story_to_continue.updateOne(story_to_continue, { upsert: true, new: true });
            return story_to_continue.story;
            break;
        case (edit == 3 && story == null):
            return 'Sorry we currently dont have more stories';
            break;
        default:
            return story.story;
            break;
    }
    return story.story;
}
exports.storyGetorCreate = storyGetorCreate;
function storyCut(story) {
    if (story.length <= 50) {
        return story;
    }
    if (story.length > 50) {
        if (/['.']/.test(story)) {
            return story.substring(story.lastIndexOf('.'));
        }
        else {
            return story.substring(story.length - 50, story.length);
        }
    }
}
exports.storyCut = storyCut;
async function storyEditAdd(add, story) {
    return await storySchema.findOneAndUpdate({ story: story }, { story: story + add, $inc: { edit: 1 } });
}
exports.storyEditAdd = storyEditAdd;
