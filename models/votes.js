const mongoose = require('mongoose');
const votesSchema = new mongoose.Schema({
    url: String,
    question: String,
    answerVariants: Array
});
module.exports.Votes = mongoose.model('Votes', votesSchema);
