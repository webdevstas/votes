import { Socket } from 'socket.io'
import { Answer } from './classes/Answer'

const registerAnswerHandlers = require('./handlers/answerHandler')
const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
io.listen(1001)

export function enableSocket(vote: Vote): void {
    io.on('connect', async (socket: Socket) => {
        socket.join(vote.url)
        registerAnswerHandlers(io, socket)
        if (vote.userAnswers){
            vote.userAnswers.forEach((answer: UserAnswers) => {
                const userAnswer = new Answer(answer.name, answer.choose, vote.url)
                userAnswer.getVoteData().then(() => {
                    const node = userAnswer.generateNode()
                    socket.emit('render', node)
                })
            })
        }
    })
}
