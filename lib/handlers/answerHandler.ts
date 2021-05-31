import { Answer } from '../classes/Answer'
import { Server, Socket } from 'socket.io'

interface AnswerPayload {
    name: string
    choose: string
    url?: string
}

module.exports = (io: Server, socket: Socket) => {
    const createAnswer = (payload: AnswerPayload) => {
        const answer = new Answer(payload.name, payload.choose, payload.url)
        answer.getVoteData()
            .then(() => {
                answer.saveAnswer()
                    .then(() => {
                        const node = answer.generateNode()
                        socket.emit('render', node)
                        socket.to(payload.url).emit('render', node)
                    })
            })
    }
    socket.on('answer', createAnswer)
}
