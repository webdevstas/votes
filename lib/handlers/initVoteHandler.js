"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Answer_1 = require("../classes/Answer");
const mongoose_1 = require("mongoose");
const { VotesModel } = require('../../models/votes');
module.exports = (io, socket, voteUrl) => {
    socket.join(voteUrl);
    VotesModel.findOne({ url: voteUrl }, function (err, vote) {
        if (err)
            throw new mongoose_1.Error(`Can not find vote with url: ${voteUrl}`);
        if (vote) {
            vote.userAnswers.forEach((answer) => {
                const userAnswer = new Answer_1.Answer(answer.name, answer.choose, voteUrl);
                userAnswer.getVoteData().then(() => {
                    const node = userAnswer.generateNode();
                    socket.emit('render', node);
                });
            });
        }
    });
};
