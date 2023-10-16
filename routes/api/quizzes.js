const express = require('express');
const router = express.Router();
const quizzesCtrl = require('../../controllers/api/quizzes');


// All paths start with '/api/quizzes'
router.get('/questions', quizzesCtrl.index);
router.post('/calcRecommendations', quizzesCtrl.calcRecommendations);


module.exports = router;