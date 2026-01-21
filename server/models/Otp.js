const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    },
    phoneNo:{
        type:Number,
        maxlength:10
    }
});

otpSchema.pre('save', async function(next){
    
})

const Otp = mongoose.model('Otp',otpSchema);

module.exports = Otp;