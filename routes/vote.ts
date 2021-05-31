import { NextFunction, Request, Response } from 'express'
import { enableSocket } from '../lib/socket'

const { VotesModel } = require('../models/votes')
const express = require('express')
const router = express.Router()

let curVote: Vote | null = null

router.param('url', async function (req: Request & ReqWithVote, res: Response, next: NextFunction, url: string) {
    await VotesModel.findOne({ url: url }).then((data: Vote) => {
        req.vote = data
        next()
    }).catch(() => {
        next({ status: 404 })
    })
})

router.get('/:url', (req: Request & ReqWithVote, res: Response) => {
    curVote = req.vote
    res.render('vote', { vote: req.vote })
})

enableSocket(curVote)//TODO: запуск после получения данных из БД

module.exports = router
