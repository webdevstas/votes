import { NextFunction, Request, Response } from 'express'
import { Socket } from 'socket.io'
import { Error } from 'mongoose'
const registerAnswerHandlers = require('../lib/handlers/answerHandler')
const { VotesModel } = require('../models/votes')
const express = require('express')
const router = express.Router()

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
    req.vote = await VotesModel.findOne({ url: url }).catch((err: Error) => {
        next(err)
    })
    next()
})

router.get('/:url', (req: Request & reqWithVote, res: Response, next: NextFunction) => {
    io.on('connection', (socket: Socket) => {
        socket.join(req.params.url)
        registerAnswerHandlers(io, socket)
    })

    res.render('vote', { vote: req.vote })
})

module.exports = router
