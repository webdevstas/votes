const { VotesModel } = require('../../models/votes')

interface SimpleNode {
    tag: string
    content: string | null
    attributes?: {
        name: string,
        value: string | number
    }
    childNodes: SimpleNode[] | null
}

export class Answer {
    name: string
    choose: string
    url: string
    availableAnswers: string[]

    constructor(name: string, choose: string, url: string) {
        this.name = name
        this.choose = choose
        this.url = url
    }

    async getVariants(): Promise<void> {
        const vote = await VotesModel.findOne({ url: this.url }, (err: Error) => {
            if (err) throw new Error(err.message)
        })
        this.availableAnswers = vote.answerVariants
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
