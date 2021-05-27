import { NextFunction, Request, Response, Errback } from 'express'
import { Socket } from 'socket.io-client'

const { VotesModel } = require('../models/votes')
const express = require('express')
const router = express.Router()
const { Answer } = require('../lib/classes/Answer')
const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
io.listen(1001)

interface reqWithVote {
    vote: {
        url: string
        question: string
        answerVariants: string[]
    }
}

router.param('url', async function (req: Request & reqWithVote, res: Response, next: NextFunction, url: string) {
    req.vote = await VotesModel.findOne({ url: url }).catch((err: Errback) => {
        next(err)
    })
    next()
})

router.get('/:url', (req: Request & reqWithVote, res: Response, next: NextFunction) => {
    io.on('connection', (socket: Socket) => {
        console.log(socket.id)
    })
    const answer = new Answer('John', 'yes', req.params.url)
    answer.getVariants().then(() => {
        console.log(answer.generateNode())
    })

    res.render('vote', { vote: req.vote })
})

module.exports = router
