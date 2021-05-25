const nodeCrypto = require('crypto')
const { VotesModel } = require('../../models/votes')

class Vote {
    url: string
    question: string
    answerVariants: string[]

    constructor(question: string, answerVariants: string[]) {
        this.question = question
        this.answerVariants = answerVariants
        this.url = nodeCrypto.createHash('sha256').digest('hex')
    }

    async saveToDb() {
       const vote = new VotesModel(this)
        await vote.save()
    }
}

module.exports = Vote
