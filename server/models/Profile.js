const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    dob:{
        type:String,
    },
    about:{
        type:String,
    },
    phoneNo:{
        type:Number,
        maxlength:10
    }
});

const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;