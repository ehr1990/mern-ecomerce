
const express = require("express");
const router  = express.Router();
const { signup, signin, requireSignin } = require('../controller/auth');
const {validateSignupRequest, isRequestValidated} = require("../validators/auth")
router.post('/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/signin',signin)
router.post('/profile',requireSignin,function(req,res){
    return res.status(200).json({message: 'profile'})
})

module.exports = router;
