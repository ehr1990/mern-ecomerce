const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");



exports.addProduct = (req,res)=>{

    
    //return res.status(200).json({file:req.files, body: req.body});

    const {name,description,price, category,quantity, createdBy} = req.body;
    let productPictures = [];
    if(req.files.lenght > 0)
    {
        productPictures =  req.files.map(file=>{
            return {img: file.filename};
        })
    }
    const productObj = {
        name:name,
        price:price,
        slug:slugify(name),
        category:category,
        quantity,
        productPictures,
        description:description,
        createdBy:req.user._id,
    }
   
    const cat = new Product(productObj);
    cat.save((error,product)=>{
        if(error) return res.status(400).json({error});
        if(product) return res.status(201).json({product})
    })
}

exports.getProduct = (req,res)=>{
    Product.find({})
                .exec((error,categories)=>{
                    if(error) return res.status(400).json({error});
                    if(categories){

                        const categoryList = createCategories(categories)
                         return res.status(200).json({categoryList}) 
                    }
                })
}