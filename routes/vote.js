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
require('dotenv').config();
const { VotesModel } = require('../models/votes');
const express = require('express');
const router = express.Router();
const registerAnswerHandlers = require('../lib/handlers/answerHandler');
const initVoteHandler = require('../lib/handlers/initVoteHandler');
const io = require('socket.io')({
    cors: {
        origin: 'http://127.0.0.1',
        methods: ['GET', 'POST']
    }
});
io.listen(1001);
let voteUrl = null;
router.param('url', function (req, res, next, url) {
    return __awaiter(this, void 0, void 0, function* () {
        voteUrl = req.params.url;
        yield VotesModel.findOne({ url: url }).then((data) => {
            req.vote = data;
            next();
        }).catch(() => {
            next({ status: 404 });
        });
    });
});
router.get('/:url', (req, res) => {
    res.render('vote', { vote: req.vote });
});
io.on('connect', (socket) => {
    registerAnswerHandlers(io, socket);
    initVoteHandler(io, socket, voteUrl);
});
module.exports = router;
