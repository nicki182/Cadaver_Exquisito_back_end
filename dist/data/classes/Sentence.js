"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sentence {
    constructor(text) {
        this.text = text;
    }
    cutLastSentence(sentences) {
        let sentence;
        if (sentences.text.length <= 50) {
            return sentences.text;
        }
        else {
            if (/['.']/.test(sentences.text) && sentences.text.length - sentences.text.lastIndexOf('.') < 50) {
                sentence = sentences.text.substring(sentences.text.lastIndexOf('.'));
                this.text = sentence;
            }
            else {
                sentence = sentences.text.substring(sentences.text.length - 50, sentences.text.length);
                this.text = sentence;
            }
        }
    }
}
exports.default = Sentence;
