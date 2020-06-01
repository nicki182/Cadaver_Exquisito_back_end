"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storyFullSchema = require('../data/mongo/story_full_schema');
const storySchema = require('../data/mongo/story_schema');
class storyFull {
    async getStory(call) {
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
            if (story == null) {
                return "sorry we currently don\'t have anymore stories";
            }
            else {
                story.story;
            }
        }
    }
}
exports.default = storyFull;
