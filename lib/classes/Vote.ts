const nodeCrypto = require('crypto')

class Vote {
    url: string;
    question: string;
    answerVariants: string[]

    constructor(question: string, answerVariants: string[]) {
        this.question = question
        this.answerVariants = answerVariants
        this.url = nodeCrypto.createHash('sha256').digest('hex')
    }

    saveToDb(): void {
        console.log('Saved:', this)
    }
}

module.exports = Vote
