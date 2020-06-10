class StoryFull {
    story: string
    constructor(storyInSentences?: [string], story?: string) {
        if (storyInSentences) {
            const story = ''
            storyInSentences.map(sentence=>story+sentence)
            this.story = story
        } else {
            this.story = story
        }
    }
}
export default StoryFull