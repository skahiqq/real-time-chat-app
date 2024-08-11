const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.post('/', UserController.createUser);
router.post('/login', UserController.login);
router.get('/all', UserController.getAllUsers);
router.get('/', authenticate, UserController.me);

module.exports = router;
