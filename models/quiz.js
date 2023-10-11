const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
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
    
    role: {
      type: String,
      required: true,
    },
   
    selectedAgent: {
      type: Object,  
      default: null, // Initialize as null until an agent is selected
    },
  });

    module.exports = mongoose.model('Quiz', quizSchema);