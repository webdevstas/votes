import { Errback, NextFunction, Request, Response } from 'express'

const express = require('express')
const router = express.Router()
const Vote = require('../lib/classes/Vote')

router.get('/', (req: Request, res: Response) => {
    res.render('index', {})
})

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const vote = new Vote(req.body.question, req.body.answer)
    vote.saveToDb().then(() => {
        res.redirect(`/votes/${vote.url}`)
    }).catch((err: Errback) => {
        next(err)
    })
})

module.exports = router
