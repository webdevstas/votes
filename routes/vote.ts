import { NextFunction, Request, Response, Errback } from 'express'

const { VotesModel } = require('../models/votes')
const express = require('express')
const router = express.Router()

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
    res.render('vote', req.vote)
})

module.exports = router
