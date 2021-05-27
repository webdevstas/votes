"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { VotesModel } = require('../models/votes');
const express = require('express');
const router = express.Router();
const { Answer } = require('../lib/classes/Answer');
const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
io.listen(1001);
router.param('url', function (req, res, next, url) {
    return __awaiter(this, void 0, void 0, function* () {
        req.vote = yield VotesModel.findOne({ url: url }).catch((err) => {
            next(err);
        });
        next();
    });
});
router.get('/:url', (req, res, next) => {
    io.on('connection', (socket) => {
        console.log(socket.id);
    });
    const answer = new Answer('John', 'yes', req.params.url);
    answer.getVariants().then(() => {
        console.log(answer.generateNode());
    });
    res.render('vote', { vote: req.vote });
});
module.exports = router;
