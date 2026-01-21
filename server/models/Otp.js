const mongoose = require('mongoose');
const mailSender = require('../utils/nodemailerConfig.js');
require('dotenv').config();

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

async function sendVerificationEmail(email,otp){
    try{
        await mailSender(email,"Verify your email",`The otp to verify your account is ${otp}`);
        console.log("Otp send successfully on ",email);
    }catch(err){
        console.log("An Error occurs while sending otp, ",err);
    }
};
otpSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next;
});

const Otp = mongoose.model('Otp',otpSchema);

module.exports = Otp;