const express = require("express");
const router  = express.Router();
const { signup, signin, requireSignin } = require('../../controller/admin/auth');

router.post('/admin/signup',signup)
router.post('/admin/signin',signin)
router.post('/profile',requireSignin,function(req,res){
    return res.status(200).json({message: 'profile'})
})

module.exports = router;