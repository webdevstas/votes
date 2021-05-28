const mongoose = require('mongoose')
const votesSchema = new mongoose.Schema({
    url: String,
    question: String,
    answerVariants: Array,
    userAnswers: Array
})
module.exports.VotesModel = mongoose.model('votes', votesSchema)
