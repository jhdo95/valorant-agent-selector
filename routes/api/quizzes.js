const express = require('express');
const router = express.Router();
const quizzesCtrl = require('../../controllers/api/quizzes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/quizzes'
router.get('/questions', quizzesCtrl.index);
router.post('/questions', ensureLoggedIn, quizzesCtrl.create)
router.post('/calculate', quizzesCtrl.calcRecommendations);


module.exports = router;