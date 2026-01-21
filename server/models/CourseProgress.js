const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
    CourseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    CompletedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
});

const CourseProgress = mongoose.model('CourseProgress',courseProgressSchema);

module.exports = CourseProgress;