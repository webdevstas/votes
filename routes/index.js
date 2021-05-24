"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Vote = require('../lib/classes/Vote');
/* GET home page. */
router.get('/', function (req, res, next) {
    const vote = new Vote('Ты красавчик?', ['Yes', 'Yes']);
    vote.saveToDb();
    res.render('index', { title: 'Express' });
});
module.exports = router;
