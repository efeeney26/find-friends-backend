const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        of: new Schema({
            question: String,
            correct_answer: String,
            incorrect_answers: [String]
        }),
        required: true
    },
    coordinates: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", UserSchema)
