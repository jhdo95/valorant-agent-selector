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
              type: String,
              required: true,
            },
          ],
        },
      ],
    });

    module.exports = mongoose.model('Quiz', quizSchema);