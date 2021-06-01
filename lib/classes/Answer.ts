const { VotesModel } = require('../../models/votes')

export class Answer {
    name: string
    choose: string
    url: string
    availableAnswers: string[]
    userAnswers: UserAnswer[]

    constructor(name: string, choose: string, url: string) {
        this.name = name
        this.choose = choose
        this.url = url
    }

    async getVoteData(): Promise<void> {
        const vote = await VotesModel.findOne({ url: this.url })
        this.availableAnswers = vote.answerVariants
        this.userAnswers = vote.userAnswers
    }

    async saveAnswer(): Promise<void> {
        this.userAnswers.push({
            name: this.name,
            choose: this.choose
        })
        await VotesModel.updateOne({ url: this.url }, { userAnswers: this.userAnswers })
    }

    generateNode(): SimpleNode {
        const answerCells: SimpleNode[] = []

        answerCells.push({
            tag: 'td',
            content: this.name,
            childNodes: null
        })

        this.availableAnswers.forEach((answer) => {
            answerCells.push({
                tag: 'td',
                content: answer === this.choose ? 'x' : null,
                childNodes: null
            })
        })

        return {
            tag: 'tr',
            content: null,
            childNodes: answerCells
        }
    }
}
