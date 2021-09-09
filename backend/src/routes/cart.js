const express = require("express");
const router  = express.Router();
const {addItemToCart} = require("../controller/cart");
const {requireSignin,adminMiddleware} = require("../common-middleware/index");

//---item be user--
router.post('/user/cart/addTocart',requireSignin,adminMiddleware,addItemToCart);

module.exports = router;