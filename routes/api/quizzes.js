const express = require('express');
const router = express.Router();
const quizzesCtrl = require('../../controllers/api/quizzes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// router.get('/questions', quizzesCtrl.getQuestions);
// router.post('/calculate', quizzesCtrl.calculateRecommendations);


module.exports = router;