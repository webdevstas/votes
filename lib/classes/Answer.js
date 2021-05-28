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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const { VotesModel } = require('../../models/votes');
class Answer {
    constructor(name, choose, url) {
        this.name = name;
        this.choose = choose;
        this.url = url;
    }
    getVoteData() {
        return __awaiter(this, void 0, void 0, function* () {
            const vote = yield VotesModel.findOne({ url: this.url });
            this.availableAnswers = vote.answerVariants;
            this.userAnswers = vote.userAnswers;
        });
    }
    saveAnswer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userAnswers.push({
                name: this.name,
                choose: this.choose
            });
            yield VotesModel.updateOne({ url: this.url }, { userAnswers: this.userAnswers });
        });
    }
    generateNode() {
        const answerCells = [];
        answerCells.push({
            tag: 'td',
            content: this.name,
            childNodes: null
        });
        this.availableAnswers.forEach((answer) => {
            answerCells.push({
                tag: 'td',
                content: answer === this.choose ? 'x' : null,
                childNodes: null
            });
        });
        return {
            tag: 'tr',
            content: null,
            childNodes: answerCells
        };
    }
}
exports.Answer = Answer;
