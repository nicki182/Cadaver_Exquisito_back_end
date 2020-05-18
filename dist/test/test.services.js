"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const services_1 = require("../utils/services");
try {
    const uri = 'mongodb://127.0.0.1:27017/Cadaver_Exquisito';
    const moongose = require("mongoose");
    moongose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}
catch (e) {
    console.log(e);
}
describe('Testing app servises', () => {
    it('A story can be called and be written', async () => {
        const story = await services_1.storyGetorCreate(0);
        console.log();
        chai_1.expect(story.edit).to.equal(0);
    }),
        it('You can only see the first sentece or no more than 20 characters of the last edit', () => {
            const sentence = services_1.storyCut("fdsjkjlkjklfsdjklljfdskljklsdfjkfjsdkljfkldsjfkldsljklerkkjekjesklfjklfjsekjfekljksejkfesjkjfksejkfjseefsfsfes");
            console.log(sentence);
            const sentence0 = services_1.storyCut("jklerkkjekjesklfjklfjse.kjfekljksejkfesjkjfksejkfjseefsfsfes");
            console.log(sentence0);
        }),
        it('A story can be updated', async () => {
            const story = await services_1.storyGetorCreate(0);
            const update = await services_1.storyEditAdd('jdskajk', story.story);
            chai_1.expect(update.edit).to.equal(1);
        });
});
