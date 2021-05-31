interface ReqWithVote {
    vote: Vote
}

interface Vote {
    url: string
    question: string
    answerVariants: string[]
    userAnswers: UserAnswers[]
}

interface UserAnswers {
    name: string
    choose: string
}
