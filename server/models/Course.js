const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratingAndReview"
        }
    ],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;