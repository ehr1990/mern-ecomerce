const express = require("express");
const router  = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth');
const {requireSignin} = require("../../common-middleware/index");
router.post('/admin/signup',signup)
//router.post('/admin/signin',signin)
router.post('/admin/signout',requireSignin, signout)
router.post('/admin/signout', signout)

router.post('/profile',requireSignin,function(req,res){
    return res.status(200).json({message: 'profile'})
})

module.exports = router;