const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const  { 
    verifyEmailAndMobile, 
    generateTotpSecret, 
    enableTotp, 
    verifyTotpToken, 
    login 
} = require('./../controllers/auth.controller');

const router = new express.Router();

router.post('/verify/otp', verifyEmailAndMobile);

router.get('/totp/:id', auth.verifyJwtToken, generateTotpSecret);

router.put('/totp/:id', auth.verifyJwtToken, enableTotp);

router.post('/totp/:id', verifyTotpToken);

router.post('/login', login);

module.exports = router;