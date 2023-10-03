const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controller/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login (for user login)
router.post('/login', usersCtrl.login);

module.exports = router;