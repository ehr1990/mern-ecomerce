const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
var userScema = new mongoose.Schema({
            firstName: {
                type: String,
                required: true,
                trim: true,
                min:3,
                max:20
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                min:3,
                max:20
            },
            username: {
                type: String,
                required: true,
                trim: true,
                unique:true,
                index:true,
                lowercase:true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                unique:true,
                index:true,
                lowercase:true
            },
            hash_passport: {
                type: String,
                required: true
            },
            role: {
                type: String,
                enum: ['user','admin'],
                default: 'admin'
            },
            contactNumber: {
                type: String
            },
            profilePicture: {
                type: String
            }
},{timestamps:true})

    userScema.virtual('password')
    .set(function(password){
        this.hash_passport =  bcrypt.hashSync(password, 10)
    });

    userScema.virtual('fullName')
        .get(function(){
            return `${this.firstName} ${this.lastName}`
        })
    userScema.methods = {
        authenticate:function(password){
            return  bcrypt.compare(password, this.hash_passport);
        }
    }
module.exports =  mongoose.model("User", userScema);