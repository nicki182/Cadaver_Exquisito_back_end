"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storySchema = require('../mongo/storySchema');
const storyFullSchema = require('../mongo/storyFullSchema');
class StoryFull {
    getStoryFull(call) {
        const storyInSentences = storySchema.findOneAndRemove({ full: true });
        if (storyInSentences != null) {
            this.storyInSentencesToStoryFull(storyInSentences.sentences);
            return this.story;
        }
        else {
            const storyFull = storyFullSchema.findOne({ id: call });
            return storyFull == null ? 'Sorry there are no more stories' : storyFull.story;
        }
    }
    storyInSentencesToStoryFull(storyInSentences) {
        let story = '';
        while (storyInSentences != []) {
            story = storyInSentences.pop().text + story;
        }
        this.story = story;
    }
}
exports.default = StoryFull;
