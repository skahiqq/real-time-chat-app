const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/me', authenticate, UserController.me);

module.exports = router;
