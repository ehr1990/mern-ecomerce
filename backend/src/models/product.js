const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price:{
        type: Number
    },
    quantity:{
        type: Number,
        required: true,
    },
    offer:{
        type: Number
    },
    description:{
        type: String
    },
    productPictures:[
        {
        img:{
            type: String,
            data: Buffer,
            contentType: String
            }
        }
    ],
    reviews:[
        {
            userId:{type: mongoose.Schema.Types.ObjectId, ref : 'User'},
            review:String
        }
    ],
    updatedAt:Date,
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref : 'User',required: true},
    category:{type:mongoose.Schema.Types.ObjectId, ref : 'Category', required: true}
},{timestamps:true});

module.exports =  mongoose.model("Product", productSchema);