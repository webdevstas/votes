"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Answer_1 = require("../classes/Answer");
module.exports = (io, socket) => {
    const createAnswer = (payload) => {
        const answer = new Answer_1.Answer(payload.name, payload.choose, payload.url);
        answer.getVoteData()
            .then(() => {
            answer.saveAnswer()
                .then(() => {
                const node = answer.generateNode();
                socket.emit('render', node);
                socket.to(payload.url).emit('render', node);
            });
        });
    };
    socket.on('answer', createAnswer);
};
