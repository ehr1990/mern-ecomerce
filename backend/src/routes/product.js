const express = require("express");
const router  = express.Router();
const {addProduct,getProduct} = require("../controller/product");
const {requireSignin,adminMiddleware} = require("../common-middleware/index");
const multer = require('multer');
const shortid = require("shortid");
const path = require("path");
//const upload = multer({dest: './uploads/'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' +file.originalname)
    }
  })
//const upload = multer(storage);
const upload = multer({ storage: storage })


  
router.post('/product/create',requireSignin,adminMiddleware, upload.array("productPicture"),addProduct);
router.get('/product/getProduct',getProduct);

module.exports = router;