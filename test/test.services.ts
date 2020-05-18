import 'mocha'
import {expect} from 'chai'
import {storyCut, storyEditAdd, storyGetorCreate} from "../utils/services";
try {
    const
        uri = 'mongodb://127.0.0.1:27017/Cadaver_Exquisito';
    const
        moongose = require("mongoose");
    moongose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    });
}
catch (e)
{
    console.log(e)
}
describe('Testing app servises', ()=>{
    it('A story can be called and be written',async ()=>{
        const story=await storyGetorCreate(0)
        console.log()
        expect(story.edit).to.equal(0)
    }),
     it('You can only see the first sentece or no more than 20 characters of the last edit',()=>{
        const sentence=storyCut("fdsjkjlkjklfsdjklljfdskljklsdfjkfjsdkljfkldsjfkldsljklerkkjekjesklfjklfjsekjfekljksejkfesjkjfksejkfjseefsfsfes")
         console.log(sentence)
         const sentence0=storyCut("jklerkkjekjesklfjklfjse.kjfekljksejkfesjkjfksejkfjseefsfsfes")
         console.log(sentence0)
     }),
     it('A story can be updated',async ()=>{
         const story=await storyGetorCreate(0)
        const update=await storyEditAdd('jdskajk',story.story)
         expect(update.edit).to.equal(1)
     })
})