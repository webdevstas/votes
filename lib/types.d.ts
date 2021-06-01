interface ReqWithVote {
    vote: Vote
}

interface Vote {
    url: string
    question: string
    answerVariants: string[]
    userAnswers: UserAnswer[]
}

interface UserAnswer {
    name: string
    choose: string
    url?: string
}

interface SimpleNode {
    tag: string
    content: string | null
    attributes?: {
        name: string,
        value: string | number
    }
    childNodes: SimpleNode[] | null
}
