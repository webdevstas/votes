import { Answer } from '../classes/Answer'
import { Server, Socket } from 'socket.io'

module.exports = (io: Server, socket: Socket) => {
    const createAnswer = (payload: UserAnswer) => {
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
