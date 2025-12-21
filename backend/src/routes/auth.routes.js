const express = require('express');
const { register, ulogin,logout, FPlogin, FPregister } = require('../controller/auth.controller');

const router = express.Router();

//User auth routes
router.post('/user/signup', register);
router.post('/user/login', ulogin);
router.get('/user/logout', logout);

//Food-Partner auth routes
router.post('/food-partner/signup', FPregister);
router.post('/food-partner/login', FPlogin);
router.get('/food-partner/logout', logout);



module.exports = router;