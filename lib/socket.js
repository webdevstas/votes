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
exports.enableSocket = void 0;
const Answer_1 = require("./classes/Answer");
const registerAnswerHandlers = require('./handlers/answerHandler');
const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
io.listen(1001);
function enableSocket(vote) {
    io.on('connect', (socket) => __awaiter(this, void 0, void 0, function* () {
        socket.join(vote.url);
        registerAnswerHandlers(io, socket);
        if (vote.userAnswers) {
            vote.userAnswers.forEach((answer) => {
                const userAnswer = new Answer_1.Answer(answer.name, answer.choose, vote.url);
                userAnswer.getVoteData().then(() => {
                    const node = userAnswer.generateNode();
                    socket.emit('render', node);
                });
            });
        }
    }));
}
exports.enableSocket = enableSocket;
