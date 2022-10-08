const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/sign_in', authController.sign_in);
router.get('/isauth',auth(), authController.isauth);
router.get('/dog',auth('createAny','dog'),authController.dog);

module.exports = router;