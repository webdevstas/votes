"use strict";
const nodeCrypto = require('crypto');
class Vote {
    constructor(question, answerVariants) {
        this.question = question;
        this.answerVariants = answerVariants;
        this.url = nodeCrypto.createHash('sha256').digest('hex');
    }
    saveToDb() {
        console.log('Saved:', this);
    }
}
module.exports = Vote;
