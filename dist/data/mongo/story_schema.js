"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Story_schema = mongoose.Schema;
const Storyschema = new Story_schema({
    storyPart0: {
        type: [String]
    },
    storyPart1: {
        type: [String]
    },
    storyPart2: {
        type: [String]
    }
});
module.exports = mongoose.model('story', Storyschema);
exports.default = Storyschema.methods;
//Mi idea con este esquema es que cuando haya un update como que se pueda ir agregando cada una de las partes de forma individual
//Ej:Hay un esquema con parte 1 pero sin 2, encontonces si hay un update de 2 se agrega en el esquema que tiene solo 1
