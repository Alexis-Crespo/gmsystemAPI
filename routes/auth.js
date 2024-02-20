const { response, request } = require('express');
const {Router} = require('express');
const { check } = require("express-validator");
const { authGet, authPost, login} = require('../controllers/auth');

const router = Router();

router.post('/register',  authPost)

router.post('/login',login);

module.exports = router;