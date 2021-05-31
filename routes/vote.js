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
const socket_1 = require("../lib/socket");
const { VotesModel } = require('../models/votes');
const express = require('express');
const router = express.Router();
let curVote = null;
router.param('url', function (req, res, next, url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield VotesModel.findOne({ url: url }).then((data) => {
            req.vote = data;
            next();
        }).catch(() => {
            next({ status: 404 });
        });
    });
});
router.get('/:url', (req, res) => {
    curVote = req.vote;
    res.render('vote', { vote: req.vote });
});
socket_1.enableSocket(curVote); //TODO: запуск после получения данных из БД
module.exports = router;
