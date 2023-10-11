const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Quiz = require('../../models/quiz');

module.exports = {
    getQuestions,
};

async function getQuestions(req, res) {
    try {
      // Fetch quiz questions from your data source (e.g., database)
      const questions = await QuizQuestion.find();
      res.json(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).json('Internal Server Error');
    }
  }