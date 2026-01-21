const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxlength:30,
        trim:true
    },
    email:{
        type:String,
        required:true,
        example:"jhondoe@gmail.com",
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true,
        enum:["Instructor","Student","Admin"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    imageUrl:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
});

const User = mongoose.model('User',userSchema);

module.exports = User;