const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Quiz = require('../../models/quiz');

module.exports = {
    index,
    create,
    calcRecommendations,
};

async function index(req, res) {
    try {
      // Fetch quiz questions from your data source (e.g., database)
      const questions = await Quiz.find();
      res.json(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).json('Internal Server Error');
    }
  }

async function create(req, res) {
    try {
        const { question, choices } = req.body;
        const newQuestion = {
          question,
          choices,
        };
  
        const savedQuestion = await Quiz.create(newQuestion);
  
        res.status(201).json(savedQuestion);
      } catch (error) {
        console.error('Error adding a question:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

 
async function calcRecommendations(req, res) {

}

