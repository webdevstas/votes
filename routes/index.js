"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Vote = require('../lib/classes/Vote');
router.get('/', (req, res) => {
    res.render('index', {});
});
router.post('/', (req, res, next) => {
    const vote = new Vote(req.body.question, req.body.answer);
    vote.saveToDb().then(() => {
        res.redirect(`/votes/${vote.url}`);
    }).catch((err) => {
        next(err);
    });
});
module.exports = router;
