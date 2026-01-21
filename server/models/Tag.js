const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tagName:{
        type:String,
        required:true,
    },
    tagDescription:{
        type:String,
        required:true,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
});

const Tag = mongoose.model('Tag',tagSchema);

module.exports = Tag;