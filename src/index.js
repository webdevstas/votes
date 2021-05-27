"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newVote_1 = require("./newVote");
const voteProcess_1 = require("./voteProcess");
if (window.location.pathname === '/') {
    newVote_1.newVote();
}
else if (window.location.pathname.includes('votes')) {
    voteProcess_1.voteProcess();
}
