import User from "./user";
const storySchema=require('../mongo/storySchema')
class sentence{
    user:User
    text:string
    constructor(user:string,text:string) {
       this.user=new User(user)
        this.text=text
    }
    cutLastSentence(story: string) {
        let sentences
        if (story.length <= 50) {
            return story
        } else {
            if (/['.']/.test(story) && story.length - story.lastIndexOf('.') < 50) {
                sentences = story.substring(story.lastIndexOf('.'))
                return sentences
            } else {
                sentences = story.substring(story.length - 50, story.length)
                return sentences
            }
        }
    }
    sentencesToStory(sentences:string[]){
        let story=''
        while(sentences!=[]){
            story=sentences.pop()+story
        }
        return story
    }
}
export default sentence