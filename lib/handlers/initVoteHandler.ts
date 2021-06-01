import { Server, Socket } from 'socket.io'
import { Answer } from '../classes/Answer'
import { Error } from 'mongoose'

const { VotesModel } = require('../../models/votes')


module.exports = (io: Server, socket: Socket, voteUrl: string): void => {
    socket.join(voteUrl)
    VotesModel.findOne({ url: voteUrl }, function (err: Error, vote: Vote) {
        if (err) throw new Error(`Can not find vote with url: ${voteUrl}`)
        if (vote) {
            vote.userAnswers.forEach((answer: UserAnswer) => {
                const userAnswer = new Answer(answer.name, answer.choose, voteUrl)
                userAnswer.getVoteData().then(() => {
                    const node = userAnswer.generateNode()
                    socket.emit('render', node)
                })
            })
        }
    })
}


