class Sentence{
    text:string
    constructor(text:string) {
        this.text=text
    }
    cutLastSentence(sentences:Sentence) {
        let sentence
        if (sentences.text.length <= 50) {
            return sentences.text
        } else {
            if (/['.']/.test(sentences.text) && sentences.text.length - sentences.text.lastIndexOf('.') < 50) {
                sentence = sentences.text.substring(sentences.text.lastIndexOf('.'))
                this.text=sentence
            } else {
                sentence = sentences.text.substring(sentences.text.length - 50, sentences.text.length)
                this.text=sentence
            }
        }
    }
}
export default Sentence