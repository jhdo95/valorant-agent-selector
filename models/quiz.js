const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            choices: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                    rolePoints: {
                        initiator: Number, 
                        controller: Number, 
                        sentinel: Number, 
                        duelist: Number, 
                    },
                },
            ],
        },
    ],
});
    module.exports = mongoose.model('Quiz', quizSchema);