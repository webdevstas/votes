"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nodeCrypto = require('crypto');
const { VotesModel } = require('../../models/votes');
class Vote {
    constructor(question, answerVariants) {
        this.question = question;
        this.answerVariants = answerVariants;
        this.url = nodeCrypto.createHmac('sha256', question + nodeCrypto.randomBytes(256)).digest('hex');
    }
    saveToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            const vote = new VotesModel(this);
            yield vote.save();
        });
    }
}
module.exports = Vote;
