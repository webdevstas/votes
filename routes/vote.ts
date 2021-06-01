import { NextFunction, Request, Response } from 'express'
import { Socket } from 'socket.io'

const cors = require('cors')

require('dotenv').config()
const { VotesModel } = require('../models/votes')
const express = require('express')
const router = express.Router()
const registerAnswerHandlers = require('../lib/handlers/answerHandler')
const initVoteHandler = require('../lib/handlers/initVoteHandler')
const io = require('socket.io')({
    cors: {
        origin: process.env.HOSTNAME,
        methods: ['GET', 'POST', 'OPTIONS']
    }
})
io.listen(1001)

let voteUrl: string | null = null

router.param('url', async function (req: Request & ReqWithVote, res: Response, next: NextFunction, url: string) {
    voteUrl = req.params.url
    await VotesModel.findOne({ url: url }).then((data: Vote) => {
        req.vote = data
        next()
    }).catch(() => {
        next({ status: 404 })
    })
})

router.get('/:url', cors(
    {
        origin: 'http://localhost',
        optionsSuccessStatus: 200
    }
), (req: Request & ReqWithVote, res: Response) => {
    res.render('vote', { vote: req.vote })
})

io.on('connect', (socket: Socket) => {
    registerAnswerHandlers(io, socket)
    initVoteHandler(io, socket, voteUrl)
})

module.exports = router
